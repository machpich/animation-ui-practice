import { useCallback } from 'react'
import {
  createParticle,
  rand,
  SAKURA_COLORS,
  useConfetti,
  type ConfettiShape,
  type Particle,
} from '../confetti'
import styles from './Cannons.module.css'

type CannonsProps = {
  /** 紙片の色。ここからランダムに選ばれる */
  colors?: string[]
  /** 紙片の形。ここからランダムに選ばれる（複数渡すと混在する） */
  shapes?: ConfettiShape[]
  /** 発射回数。2 で「パンッ…パンッ」の 1 秒差 2 連発になる */
  repeat?: number
}

/**
 * キャノン: 左右の下隅からクラッカーのように斜め上へ発射する。
 * 左は右上向き、右は左上向きに、狭い角度範囲へ強い初速で撃ち出す。
 */
function Cannons({ colors = SAKURA_COLORS, shapes = ['rect', 'circle'], repeat = 1 }: CannonsProps) {
  const spawn = useCallback(
    ({ width, height, particles }: { width: number; height: number; particles: Particle[] }) => {
      for (let i = 0; i < 90; i++) {
        // 左下の砲台 → 右上向き（-90°〜-30° 付近）
        particles.push(
          createParticle(0, height, rand(-Math.PI / 2.2, -Math.PI / 6), rand(12, 22), colors, shapes),
        )
        // 右下の砲台 → 左上向き（-150°〜-210° 付近）
        particles.push(
          createParticle(
            width,
            height,
            rand(Math.PI + Math.PI / 6, Math.PI + Math.PI / 2.2),
            rand(12, 22),
            colors,
            shapes,
          ),
        )
      }
    },
    [colors, shapes],
  )

  const { canvasRef, fire } = useConfetti(spawn)

  return (
    <div className={styles.stage}>
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
      <button type="button" className={styles.button} onClick={() => fire({ repeat })}>
        キャノン{repeat >= 2 ? `（${repeat}連発）` : ''}
      </button>
    </div>
  )
}

export default Cannons