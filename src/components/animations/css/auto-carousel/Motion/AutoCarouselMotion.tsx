import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { Children, useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './AutoCarouselMotion.module.css'

type Direction = 'left' | 'right'

type Props = {
  children: ReactNode
  /** 流れる速度（px/秒）。既定 40 */
  speed?: number
  /** 流れる向き。既定 'left' */
  direction?: Direction
  /** タイル間の間隔（px）。既定 16 */
  gap?: number
  /** ホバー中は流れを止めるか。既定 false */
  pauseOnHover?: boolean
}

/**
 * motion/react（Framer Motion）で作る無限オートカルーセル。
 *
 * 中身（children）を 2 セット並べ、帯全体の x を毎フレーム動かす。
 * x が 1 セット分（-oneSetWidth）進んだら 0 に巻き戻す＝剰余を取ることで、
 * 見た目を変えずに無限ループさせる（継ぎ目が出ない）。
 *
 * CSS 版との違いは「毎フレーム自前で位置を進める」点。そのぶん
 * ホバー停止は play-state ではなく「フレーム更新をスキップするだけ」で実現でき、
 * 速度を動的に変える・途中から向きを変えるといった制御に強い。
 */
export default function AutoCarouselMotion({
  children,
  speed = 40,
  direction = 'left',
  gap = 16,
  pauseOnHover = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [oneSetWidth, setOneSetWidth] = useState(0)
  const [paused, setPaused] = useState(false)
  const x = useMotionValue(0)

  const items = Children.toArray(children)
  // 継ぎ目なしループのため 2 セット並べる
  const loopItems = [...items, ...items]

  // 1 セット分の実幅を測る。帯は 2 セット分なので実幅の半分が巻き戻し距離。
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    setOneSetWidth(track.scrollWidth / 2)
  }, [items.length, gap])

  // 毎フレーム、経過時間 × speed だけ x を動かし、1 セット分でラップさせる。
  // delta はミリ秒なので /1000 で秒に直す。left は負方向、right は正方向へ。
  useAnimationFrame((_, delta) => {
    if (paused || oneSetWidth === 0) return
    const move = (speed * delta) / 1000
    const next = direction === 'left' ? x.get() - move : x.get() + move
    // (next % w + w) % w で 0〜-w… の範囲へ正規化。left は -w、right は +w に寄せる
    const wrapped =
      direction === 'left'
        ? ((next % oneSetWidth) - oneSetWidth) % oneSetWidth
        : ((next % oneSetWidth) + oneSetWidth) % oneSetWidth
    x.set(wrapped)
  })

  return (
    <div
      className={styles.viewport}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {/* gap は plain な CSS 変数として外側 div に、x（motion 値）は track の style に渡す */}
      <motion.div
        ref={trackRef}
        className={styles.track}
        style={{ x, gap: `${gap}px` }}
      >
        {loopItems.map((child, index) => (
          <div key={`carousel-item-${index}`} className={styles.item}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
