import { useState } from 'react'
import { HEART_FILL_PATH, HEART_STROKE_PATH, HEART_VIEW_BOX } from '../heart'
import styles from './HeartCrossBeam.module.css'

// line バリエーション：バー4本（中身なし、::after が流れる）
function CrossLine({ className }: { className: string }) {
  return (
    <div className={`${styles.cross} ${styles.crossLine} ${className}`}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className={styles.crossBar} />
      ))}
    </div>
  )
}

// seg バリエーション：バー4本、それぞれに seg(span) を内包
function CrossSeg({ className }: { className: string }) {
  return (
    <div className={`${styles.cross} ${styles.crossSeg} ${className}`}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className={styles.crossBar}>
          <span className={styles.crossSegInner} />
        </div>
      ))}
    </div>
  )
}

function HeartCrossBeam() {
  const [liked, setLiked] = useState(false)
  // いいね ON のたびにエフェクトを作り直して再生させるためのキー
  const [burstKey, setBurstKey] = useState(0)

  const handleClick = () => {
    setLiked((prev) => {
      if (!prev) setBurstKey((k) => k + 1)
      return !prev
    })
  }

  return (
    <button
      type="button"
      className={styles.container}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? 'いいねを取り消す' : 'いいねする'}
    >
      <div className={styles.wrapper}>
        <div className={styles.heart}>
          <svg className={styles.heartStroke} viewBox={HEART_VIEW_BOX} aria-hidden="true">
            <path d={HEART_STROKE_PATH} fill="#aaa" />
          </svg>
          {liked && (
            <div key={burstKey}>
              <svg className={styles.heartFill} viewBox={HEART_VIEW_BOX} aria-hidden="true">
                <path d={HEART_FILL_PATH} fill="#fe587a" />
              </svg>
              <CrossLine className={styles.cross0} />
              <CrossSeg className={styles.cross1} />
              <CrossSeg className={styles.cross2} />
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default HeartCrossBeam