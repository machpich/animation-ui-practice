import { useState, type CSSProperties } from 'react'
import styles from './BouncePop.module.css'

/** 出現時の頂点（伸びる起点）のプリセット。角・辺・中央の 9 方向 */
type OriginPreset =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

/**
 * プリセット 9 方向、または transform-origin の生値（例: 'top 100px right 30px'）。
 * `& {}` はプリセット候補を補完に残しつつ任意文字列も許すためのイディオム。
 */
type Origin = OriginPreset | (string & {})

// プリセットを CSS の transform-origin 値へ対応づける。表になければ生値をそのまま使う
const ORIGIN_PRESET_TO_CSS: Record<OriginPreset, string> = {
  'top-left': 'left top',
  top: 'center top',
  'top-right': 'right top',
  left: 'left center',
  center: 'center center',
  right: 'right center',
  'bottom-left': 'left bottom',
  bottom: 'center bottom',
  'bottom-right': 'right bottom',
}

const toTransformOrigin = (origin: Origin): string =>
  origin in ORIGIN_PRESET_TO_CSS
    ? ORIGIN_PRESET_TO_CSS[origin as OriginPreset]
    : origin

type Props = {
  /** ぷるんの速度（ミリ秒）。既定 500ms */
  durationMs?: number
  /** 出現時の頂点（伸びる起点）。9 方向プリセット or transform-origin の生値。既定 'top-right' */
  origin?: Origin
}

// mounted: DOM に存在するか / closing: 閉じアニメを再生中か
function BouncePop({ durationMs = 500, origin = 'top-right' }: Props) {
  const [mounted, setMounted] = useState(false)
  const [closing, setClosing] = useState(false)
  // 開くたびに +1。key に使い、box を作り直して pop-in を確実に頭から再生させる
  const [popKey, setPopKey] = useState(0)

  const open = () => {
    setClosing(false)
    setPopKey((k) => k + 1)
    setMounted(true)
  }
  // 閉じるときはすぐ消さず、pop-out を流してから onAnimationEnd で外す
  const startClose = () => setClosing(true)

  const handleTrigger = () => (mounted && !closing ? startClose() : open())

  // 閉じアニメ（pop-out）の完了時のみアンマウント。開きアニメ完了では何もしない
  const handleBoxAnimationEnd = () => {
    if (!closing) return
    setMounted(false)
    setClosing(false)
  }

  // 速度と頂点を CSS 変数へ渡す（box 側の var(--pop-duration) / var(--pop-origin) が参照）
  const style = {
    '--pop-duration': `${durationMs}ms`,
    '--pop-origin': toTransformOrigin(origin),
  } as CSSProperties

  return (
    <>
      {mounted && (
        <div
          className={`${styles.overlay} ${closing ? styles.closing : ''}`}
          style={style}
          onClick={startClose}
        />
      )}

      <div className={styles.anchor}>
        <button type="button" className={styles.trigger} onClick={handleTrigger}>
          {mounted && !closing ? '×' : '☰'}
        </button>

        {mounted && (
          <div
            key={popKey}
            className={`${styles.box} ${closing ? styles.closing : ''}`}
            style={style}
            onAnimationEnd={handleBoxAnimationEnd}
          >
            🎉
          </div>
        )}
      </div>
    </>
  )
}

export default BouncePop