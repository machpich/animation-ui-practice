import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import styles from './ScrollReveal.module.css'

type Settle = 'snap' | 'smooth'

type Props = {
  children: ReactNode
  /** 下からの立ち上がり距離（px）。既定 64 */
  distance?: number
  /** 現れる速度（秒）。既定 0.8 */
  duration?: number
  /** true: 一度だけ / false: 画面に入るたび出し直す。既定 true */
  once?: boolean
  /** 要素が何割見えたら発火するか（0〜1）。既定 0.3 */
  amount?: number
  /** 着地の質感。snap: カチッと収まる / smooth: 吸い付く。既定 'snap' */
  settle?: Settle
}

/**
 * スクロールで下からふわっと現れる（IntersectionObserver + CSS 版）。
 *
 * motion を使わず、標準機能だけで作る：
 * - 見えたかの判定 … IntersectionObserver
 * - 実際の動き    … CSS transition（距離・速度・イージングは CSS 変数で外から差し込む）
 */
export default function ScrollReveal({
  children,
  distance = 64,
  duration = 0.8,
  once = true,
  amount = 0.3,
  settle = 'snap',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) io.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      // rootMargin で発火ラインをビューポート下辺より内側に上げる。
      // 要素が amount 境界ちょうどで静止しても isIntersecting が往復せず、震えを防ぐ
      // （下にスクロール余地の少ない最終セクションで顕著）。
      { threshold: amount, rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, amount])

  const style = {
    '--reveal-distance': `${distance}px`,
    '--reveal-duration': `${duration}s`,
  } as CSSProperties

  // 観測対象（外枠）は動かさず、動くのは内側だけにする。
  // 同じ要素を観測しつつ動かすと、transform で発火ラインを自分で跨いでしまい、
  // once=false のとき付与⇄解除を繰り返してガタつくため。
  return (
    <div ref={ref} style={style}>
      <div className={`${styles.reveal} ${styles[settle]} ${shown ? styles.visible : ''}`}>
        {children}
      </div>
    </div>
  )
}
