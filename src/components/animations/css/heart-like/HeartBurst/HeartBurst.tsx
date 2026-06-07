import { useState } from 'react'
import { HEART_FILL_PATH, HEART_STROKE_PATH, HEART_VIEW_BOX } from '../heart'
import styles from './HeartBurst.module.css'

const DECO_CLASSES = [styles.deco1, styles.deco2, styles.deco3, styles.deco4, styles.deco5]

function HeartBurst() {
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
          <svg className={styles.stroke} viewBox={HEART_VIEW_BOX} aria-hidden="true">
            <path d={HEART_STROKE_PATH} fill="#aaa" />
          </svg>
          {liked && (
            <div key={burstKey}>
              {DECO_CLASSES.map((decoClass, i) => (
                <div key={i} className={`${styles.deco} ${decoClass}`}>
                  <svg viewBox={HEART_VIEW_BOX} aria-hidden="true">
                    <path d={HEART_FILL_PATH} fill="#fe587a" />
                  </svg>
                </div>
              ))}
              <svg className={styles.pulse} viewBox={HEART_VIEW_BOX}>
                <path d={HEART_FILL_PATH} />
              </svg>
              <svg className={styles.fill} viewBox={HEART_VIEW_BOX} aria-hidden="true">
                <path d={HEART_FILL_PATH} fill="#fe587a" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default HeartBurst