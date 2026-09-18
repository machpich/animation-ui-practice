import type { ReactNode } from 'react'
import BouncePop from '../animations/css/bounce-pop/BouncePop'
import HoverEffect from '../animations/css/hover-effect/HoverEffect'
import HeartParticleBurst from '../animations/css/heart-like/ParticleBurst/HeartParticleBurst'
import HeartBurst from '../animations/css/heart-like/HeartBurst/HeartBurst'
import HeartCrossBeam from '../animations/css/heart-like/CrossBeam/HeartCrossBeam'
import Burst from '../animations/canvas/confetti/Burst/Burst'
import Fireworks from '../animations/canvas/confetti/Fireworks/Fireworks'
import Cannons from '../animations/canvas/confetti/Cannons/Cannons'
import Rain from '../animations/canvas/confettiRain/Rain/Rain'
import AutoCarouselMotion from '../animations/motion/auto-carousel/AutoCarouselMotion'
import { carouselTiles } from '../animations/motion/auto-carousel/carouselTiles'
import ScrollReveal from '../animations/scroll-reveal/motion/ScrollReveal'
import ScrollRevealCss from '../animations/scroll-reveal/css/ScrollReveal'
import LikeAnimation from '../animations/rive/LikeAnimation/LikeAnimation'

// 各サンプルを枠付きで並べる 1 セル。見出し + 中身を中央寄せで囲む
const Item = ({ title, children }: { title: string; children: ReactNode }) => (
  <div
    style={{
      border: '1px solid #e2e2e2',
      borderRadius: 12,
      padding: '1.25rem',
      background: '#fff',
    }}
  >
    <h3 style={{ margin: '0 0 1rem' }}>{title}</h3>
    <div style={{ display: 'grid', placeItems: 'center', minHeight: 320 }}>{children}</div>
  </div>
)

// motion 版・CSS 版で共通のスクロールデモ。Reveal に描画する実装コンポーネントを渡す
const ScrollRevealDemo = ({
  Reveal,
}: {
  Reveal: typeof ScrollReveal | typeof ScrollRevealCss
}) => (
  <div
    style={{
      width: '100%',
      height: 320,
      overflowY: 'auto',
      border: '1px dashed #cbd5e1',
      borderRadius: 12,
    }}
  >
    <div style={{ padding: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>
      ↓ スクロールすると順に上がってくる（背景色で境目が分かる） ↓
    </div>
    {['Section 1', 'Section 2', 'Section 3'].map((label, i) => (
      <section
        key={label}
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: 240,
          background: ['#eef2ff', '#fef2f5', '#effaf3'][i],
        }}
      >
        <Reveal once={false}>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 200,
              height: 120,
              borderRadius: 16,
              background: [
                'linear-gradient(135deg, #fe587a, #ff9a6b)',
                'linear-gradient(135deg, #6b8bff, #7ee8fa)',
                'linear-gradient(135deg, #8e6bff, #ff6bd6)',
              ][i],
              color: '#fff',
              fontWeight: 600,
            }}
          >
            {label}
          </div>
        </Reveal>
      </section>
    ))}
  </div>
)

export const Gallery = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <Item title="Bounce Pop">
        {/* fixed 配置のモーダルを枠内に閉じ込める（transform で fixed の基準をこの枠にする） */}
        <div style={{ position: 'relative', width: '100%', height: 320, transform: 'translateZ(0)' }}>
          <BouncePop />
        </div>
      </Item>
      <Item title="hover-effect">
        <HoverEffect />
      </Item>
      <Item title="Heart Like - Particle Burst">
        <HeartParticleBurst />
      </Item>
      <Item title="Heart Like - Heart Burst">
        <HeartBurst />
      </Item>
      <Item title="Heart Like - Cross Beam">
        <HeartCrossBeam />
      </Item>
      <Item title="Confetti - Burst">
        <Burst />
      </Item>
      <Item title="Confetti - Fireworks">
        <Fireworks />
      </Item>
      <Item title="Confetti - Cannons">
        <Cannons />
      </Item>
      <Item title="Confetti Rain - Rain">
        {/* Rain の .stage は height:100% なので、降る範囲のサイズは style で明示する
            （高さを渡さないと canvas がセルを突き抜けて画面全体に降ってしまう） */}
        <Rain
          amount={60}
          style={{
            width: '100%',
            height: 320,
            borderRadius: 12,
            background:
              'radial-gradient(120% 100% at 50% 0%, #1b2438 0%, #131a29 60%, #0c111c 100%)',
          }}
        />
      </Item>
      <Item title="Scroll Reveal - Motion">
        <ScrollRevealDemo Reveal={ScrollReveal} />
      </Item>
      <Item title="Scroll Reveal - CSS (IntersectionObserver)">
        <ScrollRevealDemo Reveal={ScrollRevealCss} />
      </Item>
      <Item title="Auto Carousel - Motion">
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <AutoCarouselMotion pauseOnHover>{carouselTiles}</AutoCarouselMotion>
        </div>
      </Item>
      <Item title="Rive">
        <LikeAnimation />
      </Item>
    </div>
  )
}

export default Gallery