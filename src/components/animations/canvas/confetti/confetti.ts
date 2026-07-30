import { useCallback, useEffect, useRef } from 'react'

/**
 * 紙片（花びら）の形。
 * - rect / circle: 元コード由来の紙吹雪
 * - petal: 桜吹雪らしいしずく型の花びら
 */
export type ConfettiShape = 'rect' | 'circle' | 'petal'

/**
 * 1 粒の紙片が持つ状態。
 * 位置・速度に加えて、ひらひら見せるための回転（rotation）と傾き（tilt）を持つ。
 */
export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  tiltAngle: number
  tiltSpeed: number
  shape: ConfettiShape
  life: number
  decay: number
  gravity: number
  drag: number
}

/** 桜色のパレット。花吹雪の既定色 */
export const SAKURA_COLORS = [
  '#ffb7c5', // 桜ピンク
  '#ff8fab', // 濃いめピンク
  '#ffd6e0', // 淡いピンク
  '#fff0f5', // ほぼ白
  '#f7a8c4', // ローズ
]

// 落下の効き具合。GRAVITY で下向きに加速し、DRAG で毎フレーム少しずつ減速させる
export const GRAVITY = 0.28
export const DRAG = 0.008

export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 1 粒を「位置 (x, y) から角度 angle・初速 speed で撃ち出す」形で作る。
 * どのパターンも、この関数へ渡す位置と角度の分布だけが違う。
 */
export function createParticle(
  x: number,
  y: number,
  angle: number,
  speed: number,
  colors: string[],
  shapes: ConfettiShape[],
): Particle {
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: rand(6, 12),
    color: pick(colors),
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: rand(-0.2, 0.2),
    tiltAngle: rand(0, Math.PI * 2),
    tiltSpeed: rand(0.05, 0.12),
    shape: pick(shapes),
    life: 1,
    decay: rand(0.006, 0.012),
    gravity: GRAVITY * rand(0.8, 1.2),
    drag: DRAG,
  }
}

// 花びら（petal）を 1 枚描く。原点中心に、上向きのしずく型を塗る
function drawPetal(ctx: CanvasRenderingContext2D, size: number) {
  const s = size
  ctx.beginPath()
  ctx.moveTo(0, -s / 2)
  ctx.bezierCurveTo(s / 2, -s / 2, s / 2, s / 3, 0, s / 2)
  ctx.bezierCurveTo(-s / 2, s / 3, -s / 2, -s / 2, 0, -s / 2)
  ctx.closePath()
  ctx.fill()
}

/**
 * 撒き方（spawn）を受け取り、canvas への描画・物理・rAF ループを丸ごと引き受けるフック。
 *
 * パターン側は「どこから・どの向きに・何粒まくか」だけを spawn として実装すればよく、
 * 重力・抗力・ひらひら回転・寿命管理・描画はここに集約している。
 */
export function useConfetti(
  spawn: (ctx: { width: number; height: number; particles: Particle[] }) => void,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)
  // 連発（2 発目以降）を予約した setTimeout の id 一覧。アンマウント時にまとめて止める
  const timersRef = useRef<number[]>([])
  // 次フレームの予約はこの ref 経由で自分自身を呼ぶ（自己参照を ref に逃がす）
  const animateRef = useRef<() => void>(() => {})

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Retina でもぼやけないよう、CSS 上のサイズ × dpr を実ピクセルにする
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const particles = particlesRef.current

    // 後ろから走査して、寿命切れ・画面外を splice で安全に間引く
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]

      // 重力で下向きに加速 → 抗力で少し減速 → 位置を更新
      p.vy += p.gravity
      p.vx *= 1 - p.drag
      p.vy *= 1 - p.drag
      p.x += p.vx
      p.y += p.vy
      // 回転と傾きを進めて、ひらひら舞う見た目を作る
      p.rotation += p.rotationSpeed
      p.tiltAngle += p.tiltSpeed
      p.life -= p.decay

      if (p.life <= 0 || p.y - p.size > h) {
        particles.splice(i, 1)
        continue
      }

      // tiltAngle の sin で横幅を伸縮させ、紙片が翻る（表裏が入れ替わる）感じを出す
      const wobble = Math.sin(p.tiltAngle) * (p.size / 2)
      ctx.save()
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life))
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size + wobble * 0.3, p.size * 0.6)
      } else if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size / 2, (p.size / 2) * 0.7, 0, 0, Math.PI * 2)
        ctx.fill()
      } else {
        drawPetal(ctx, p.size)
      }
      ctx.restore()
    }

    // 紙片が残っている限り次フレームを予約。尽きたらループを止める
    if (particles.length > 0) {
      rafRef.current = requestAnimationFrame(() => animateRef.current())
    } else {
      ctx.clearRect(0, 0, w, h)
      rafRef.current = null
    }
  }, [])

  // 最新の animate を ref に保持し、rAF からはこれ経由で呼ぶ（自己参照を ref に逃がす）
  useEffect(() => {
    animateRef.current = animate
  }, [animate])

  // 1 回だけ撒いてループを（止まっていれば）起動する
  const burstOnce = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    spawn({
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      particles: particlesRef.current,
    })
    // ループが止まっているときだけ起動する（多重起動を防ぐ）
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => animateRef.current())
    }
  }, [spawn])

  /**
   * 発射する。
   * @param opts.repeat  発射回数（既定 1）。2 なら「パンッ…パンッ」の 2 連発
   * @param opts.interval 連発の間隔ミリ秒（既定 1000）
   */
  const fire = useCallback(
    (opts?: { repeat?: number; interval?: number }) => {
      const repeat = opts?.repeat ?? 1
      const interval = opts?.interval ?? 1000
      burstOnce()
      // 2 発目以降を interval 間隔で予約する
      for (let n = 1; n < repeat; n++) {
        const id = window.setTimeout(burstOnce, interval * n)
        timersRef.current.push(id)
      }
    },
    [burstOnce],
  )

  // アンマウント時に走りっぱなしの rAF と予約中のタイマーを止める
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  return { canvasRef, fire }
}