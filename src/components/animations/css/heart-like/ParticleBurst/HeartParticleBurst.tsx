import { useId, useState } from 'react'
import { HEART_FILL_PATH, HEART_STROKE_PATH, HEART_VIEW_BOX } from '../heart'
import styles from './HeartParticleBurst.module.css'

const PARTICLE_COUNT = 10

type HeartParticleBurstProps = {
  /**
   * 塗りハートの色。
   * - 1 色 → 単色塗り
   * - 2 色以上 → 上から下へのグラデーション
   */
  colors?: string[]
}

function HeartParticleBurst({ colors = ['#fe587a'] }: HeartParticleBurstProps) {
  const [liked, setLiked] = useState(false)
  // いいね ON のたびにエフェクトを作り直して再生させるためのキー
  const [burstKey, setBurstKey] = useState(0)
  // グラデーションの id をコンポーネントごとにユニークにして衝突を防ぐ
  const gradientId = useId()

  const handleClick = () => {
    setLiked((prev) => {
      if (!prev) setBurstKey((k) => k + 1)
      return !prev
    })
  }

  const isGradient = colors.length >= 2
  const fillValue = isGradient ? `url(#${gradientId})` : colors[0]

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
              <div className={styles.circle} />
              {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
                <div key={i} className={styles.particle} />
              ))}
              <svg className={styles.fill} viewBox={HEART_VIEW_BOX}>
                {isGradient && (
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      {colors.map((color, i) => (
                        <stop
                          key={i}
                          offset={`${(i / (colors.length - 1)) * 100}%`}
                          stopColor={color}
                        />
                      ))}
                    </linearGradient>
                  </defs>
                )}
                <path d={HEART_FILL_PATH} fill={fillValue} />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default HeartParticleBurst
