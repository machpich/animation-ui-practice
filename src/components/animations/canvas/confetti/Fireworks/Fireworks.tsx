import { useCallback } from 'react'
import {
  createParticle,
  rand,
  SAKURA_COLORS,
  useConfetti,
  type ConfettiShape,
  type Particle,
} from '../confetti'
import styles from './Fireworks.module.css'

type FireworksProps = {
  /** 紙片の色。ここからランダムに選ばれる */
  colors?: string[]
  /** 紙片の形。ここからランダムに選ばれる（複数渡すと混在する） */
  shapes?: ConfettiShape[]
  /** 発射回数。2 で「パンッ…パンッ」の 1 秒差 2 連発になる */
  repeat?: number
}

/**
 * 花火: 画面上部の複数箇所を打ち上げ点にして、それぞれ放射状に開かせる。
 * 打ち上げ点（cx, cy）を上半分でばらけさせ、1 発ずつ別の場所で開いたように見せる。
 */
function Fireworks({ colors = SAKURA_COLORS, shapes = ['rect', 'circle'], repeat = 1 }: FireworksProps) {
  const spawn = useCallback(
    ({ width, height, particles }: { width: number; height: number; particles: Particle[] }) => {
      for (let b = 0; b < 3; b++) {
        const cx = rand(width * 0.2, width * 0.8)
        const cy = rand(height * 0.2, height * 0.5)
        for (let i = 0; i < 80; i++) {
          particles.push(createParticle(cx, cy, rand(0, Math.PI * 2), rand(4, 11), colors, shapes))
        }
      }
    },
    [colors, shapes],
  )

  const { canvasRef, fire } = useConfetti(spawn)

  return (
    <div className={styles.stage}>
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
      <button type="button" className={styles.button} onClick={() => fire({ repeat })}>
        花火{repeat >= 2 ? `（${repeat}連発）` : ''}
      </button>
    </div>
  )
}

export default Fireworks