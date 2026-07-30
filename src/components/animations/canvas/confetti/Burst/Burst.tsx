import { useCallback } from 'react'
import {
  createParticle,
  rand,
  SAKURA_COLORS,
  useConfetti,
  type ConfettiShape,
  type Particle,
} from '../confetti'
import styles from './Burst.module.css'

type BurstProps = {
  /** 紙片の色。ここからランダムに選ばれる */
  colors?: string[]
  /** 紙片の形。ここからランダムに選ばれる（複数渡すと混在する） */
  shapes?: ConfettiShape[]
  /** 発射回数。2 で「パンッ…パンッ」の 1 秒差 2 連発になる */
  repeat?: number
}

/**
 * バースト: 中央 1 点から全方位（0〜2π）へ一気に弾けさせる。
 * 角度を一様乱数にすることで、360°どの向きにも均等に飛ぶ。
 */
function Burst({ colors = SAKURA_COLORS, shapes = ['rect', 'circle'], repeat = 1 }: BurstProps) {
  const spawn = useCallback(
    ({ width, height, particles }: { width: number; height: number; particles: Particle[] }) => {
      const cx = width / 2
      const cy = height / 2
      for (let i = 0; i < 160; i++) {
        particles.push(createParticle(cx, cy, rand(0, Math.PI * 2), rand(6, 16), colors, shapes))
      }
    },
    [colors, shapes],
  )

  const { canvasRef, fire } = useConfetti(spawn)

  return (
    <div className={styles.stage}>
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
      <button type="button" className={styles.button} onClick={() => fire({ repeat })}>
        バースト{repeat >= 2 ? `（${repeat}連発）` : ''}
      </button>
    </div>
  )
}

export default Burst