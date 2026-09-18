import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Settle = 'snap' | 'smooth'

// snap: easeOutBack（少し行き過ぎて戻る） / smooth: easeOutExpo（吸い付いて止まる）
const SETTLE_EASE: Record<Settle, [number, number, number, number]> = {
  snap: [0.175, 0.885, 0.32, 1.275],
  smooth: [0.16, 1, 0.3, 1],
}

type Props = {
  children: ReactNode
  /** 下からの立ち上がり距離（px）。既定 64 */
  distance?: number
  /** 現れる速度（秒）。既定 0.8 */
  duration?: number
  /** 表示までの遅延（秒）。既定 0 */
  delay?: number
  /** true: 一度だけ / false: 画面に入るたび出し直す。既定 true */
  once?: boolean
  /** 要素が何割見えたら発火するか（0〜1）。既定 0.3 */
  amount?: number
  /** 着地の質感。snap: カチッと収まる / smooth: 吸い付く。既定 'snap' */
  settle?: Settle
}

/** スクロールで下からふわっと現れる。複数並べると順に上がってくる。 */
export default function ScrollReveal({
  children,
  distance = 64,
  duration = 0.8,
  delay = 0,
  once = true,
  amount = 0.3,
  settle = 'snap',
}: Props) {
  const reduceMotion = useReducedMotion()

  // reduced-motion 時は酔いやすい縦移動を切り、フェードのみにする
  const initial = reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance }
  const animate = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const ease = reduceMotion ? 'easeOut' : SETTLE_EASE[settle]

  // 外側は動かない「観測枠」、動くのは内側だけ。こうしないと snap の overshoot で
  // 要素が枠外へはみ出し、amount 境界を跨いで発火⇄リセットを繰り返して震える。
  // さらに margin で発火ラインを下辺より内側に上げ、要素が境界ちょうどで静止しても
  // 往復しないようにする（下にスクロール余地の少ない最終セクションで顕著）。
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '0px 0px -15% 0px' }}
    >
      <motion.div
        variants={{ hidden: initial, visible: animate }}
        transition={{ duration, delay, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
