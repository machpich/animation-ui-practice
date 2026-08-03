import type { ReactNode } from 'react'
import BouncePop from '../css/bounce-pop/BouncePop'
import HoverEffect from '../css/hover-effect/HoverEffect'
import HeartParticleBurst from '../css/heart-like/ParticleBurst/HeartParticleBurst'
import HeartBurst from '../css/heart-like/HeartBurst/HeartBurst'
import HeartCrossBeam from '../css/heart-like/CrossBeam/HeartCrossBeam'
import Burst from '../canvas/confetti/Burst/Burst'
import Fireworks from '../canvas/confetti/Fireworks/Fireworks'
import Cannons from '../canvas/confetti/Cannons/Cannons'
import Rain from '../canvas/confettiRain/Rain/Rain'
import LikeAnimation from '../rive/LikeAnimation/LikeAnimation'

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
      <Item title="Rive">
        <LikeAnimation />
      </Item>
    </div>
  )
}

export default Gallery