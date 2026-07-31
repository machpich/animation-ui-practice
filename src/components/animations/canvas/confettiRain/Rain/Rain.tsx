import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import styles from './Rain.module.css'

const COLORS = ['#ff5b8a', '#ffd24c', '#4cc9ff', '#7cff6b', '#b57cff', '#ff8f4c', '#ffffff']
const FADE_ZONE = 0.3 // 範囲の下 30% で透明にフェードする

const rand = (min: number, max: number) => Math.random() * (max - min) + min
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/** 降らせる層。back=children の背面 / front=前面 / both=前後で挟む */
type RainLayer = 'back' | 'front' | 'both'

type RainProps = {
  /** 同時に降っている紙片の量（目安の枚数） */
  amount?: number
  /** 降らせ続ける時間（ミリ秒）。未指定なら止めずに降り続ける */
  duration?: number
  /** 落下速度の倍率。1 が標準 */
  speed?: number
  /** 降らせる層。both は前後 2 層に amount を配分する */
  layer?: RainLayer
  /** 紙片の色。ここからランダムに選ばれる */
  colors?: string[]
  /** 降らせる領域のサイズ・位置を外から指定する（未指定なら親いっぱい） */
  className?: string
  style?: CSSProperties
  /** 紙吹雪と重ねる中身（無くてもよい） */
  children?: ReactNode
}

// 一定速度で落ちる矩形の紙片。tilt で斜めに傾き、spin で横幅を潰して翻る
interface Flake {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  color: string
  tilt: number
  tiltSpeed: number
  spin: number
  spinSpeed: number
  depth: number // 0=手前〜1=奥。奥ほど小さく・遅く・薄い
  front: boolean // 前面 canvas に描くか（layer='both' の振り分け）
}

/** 1 片を作る。initial=true なら範囲全体に、false なら上端の外に配置する */
function createFlake(
  width: number,
  height: number,
  speed: number,
  colors: string[],
  initial: boolean,
  front: boolean,
): Flake {
  const depth = Math.random()
  const long = Math.random() < 0.5
  const scale = 1 - depth * 0.4 // 奥ほど小さく（幅・高さ両方にかけて縦横比を保つ）
  const w = (long ? rand(6, 9) : rand(8, 13)) * scale
  const h = (long ? rand(11, 15) : w) * (long ? scale : 1)
  return {
    x: rand(0, width),
    y: initial ? rand(-h, height) : rand(-h * 6, -h),
    vx: rand(-0.5, 0.5) * speed,
    vy: rand(1.6, 3.2) * (1 - depth * 0.45) * speed,
    w,
    h,
    color: pick(colors),
    tilt: rand(0, Math.PI * 2),
    tiltSpeed: rand(-0.06, 0.06),
    spin: rand(0, Math.PI * 2),
    spinSpeed: rand(0.08, 0.2),
    depth,
    front,
  }
}

function Rain({
  amount = 60,
  duration,
  speed = 1,
  layer = 'back',
  colors = COLORS,
  className,
  style,
  children,
}: RainProps) {
  const backRef = useRef<HTMLCanvasElement>(null)
  const frontRef = useRef<HTMLCanvasElement>(null)

  // 変わってもループを張り直さない props は ref 経由でループへ渡す
  const settings = useRef({ amount, speed, colors, layer })
  useEffect(() => {
    settings.current = { amount, speed, colors, layer }
  }, [amount, speed, colors, layer])

  // アニメーションループ。duration が変わったときだけ張り直す
  useEffect(() => {
    const back = backRef.current
    const backCtx = back?.getContext('2d')
    if (!back || !backCtx) return
    const front = frontRef.current
    const frontCtx = front?.getContext('2d') ?? null

    const flakes: Flake[] = []
    let seeded = false
    let refilling = true
    let raf = 0

    // duration 経過で補充を止める（残りは降り切ってから終了）
    const stopTimer =
      duration === undefined ? undefined : window.setTimeout(() => (refilling = false), duration)

    const toFront = (l: RainLayer) => (l === 'front' ? true : l === 'both' ? Math.random() < 0.5 : false)

    // 実ピクセルを dpr に合わせてクリアし、描画用 ctx を返す
    const prepare = (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null, dpr: number, w: number, h: number) => {
      if (!canvas || !ctx) return null
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      return ctx
    }

    const step = () => {
      const dpr = window.devicePixelRatio || 1
      const w = back.clientWidth
      const h = back.clientHeight
      const { amount, speed, colors, layer } = settings.current

      const bctx = prepare(back, backCtx, dpr, w, h)!
      const fctx = layer === 'back' ? null : prepare(front, frontCtx, dpr, w, h)

      // 量を保つよう補充（初回だけ範囲全体に散らして途中から始める）
      if (refilling) {
        while (flakes.length < amount) {
          flakes.push(createFlake(w, h, speed, colors, !seeded, toFront(layer)))
        }
        seeded = true
      }

      // 各片を進めて描く。下へ抜けたら補充中は上端へ戻し、停止後は除去
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i]
        f.x += f.vx
        f.y += f.vy
        f.tilt += f.tiltSpeed
        f.spin += f.spinSpeed

        if (f.y - f.h > h) {
          if (refilling) flakes[i] = { ...createFlake(w, h, speed, colors, false, f.front), y: -f.h }
          else flakes.splice(i, 1)
          continue
        }

        const ctx = f.front ? fctx : bctx
        if (!ctx) continue
        const fade = f.y <= h * (1 - FADE_ZONE) ? 1 : Math.max(0, (h - f.y) / (h * FADE_ZONE))
        ctx.save()
        ctx.globalAlpha = (0.95 - f.depth * 0.4) * fade
        ctx.translate(f.x, f.y)
        ctx.rotate(f.tilt)
        ctx.scale(Math.cos(f.spin), 1) // 横幅を潰して翻りを表現
        ctx.fillStyle = f.color
        ctx.fillRect(-f.w / 2, -f.h / 2, f.w, f.h)
        ctx.restore()
      }

      if (!refilling && flakes.length === 0) return
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(stopTimer)
    }
  }, [duration])

  return (
    <div className={`${styles.stage} ${className ?? ''}`} style={style}>
      <canvas ref={backRef} aria-hidden="true" className={styles.back} />
      {children && <div className={styles.content}>{children}</div>}
      {layer !== 'back' && <canvas ref={frontRef} aria-hidden="true" className={styles.front} />}
    </div>
  )
}

export default Rain
