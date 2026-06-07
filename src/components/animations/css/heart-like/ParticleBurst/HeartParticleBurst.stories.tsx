import type { Meta, StoryObj } from '@storybook/react'
import HeartParticleBurst from './HeartParticleBurst'
import tsx from './HeartParticleBurst.tsx?raw'
import css from './HeartParticleBurst.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS の両方を出す */
const SOURCE = [
  '// 使い方',
  `<HeartParticleBurst colors={['#fe587a']} />            // 単色`,
  `<HeartParticleBurst colors={['#ff8aa0', '#fe2f6d']} /> // グラデーション`,
  '',
  '// ── HeartParticleBurst.tsx ──',
  tsx,
  '',
  '/* ── HeartParticleBurst.module.css ── */',
  css,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒）',
  '',
  '列でレイヤーごとの動き、行で全体の流れが追える。',
  '',
  '- **A: リング `.circle`**（delay 0s / 継続 1.1s）',
  '- **B: 粒子 `.particle`×10**（放射 `move` 0.65s + 膨縮 `scale-in→out`／色ごとに時差発火）',
  '- **C: 塗りハート `.fill`**（`popup` delay 0.15s / 継続 0.7s・主役）',
  '',
  '| 時刻 | A: リング | B: 粒子 | C: 塗りハート |',
  '|---|---|---|---|',
  '| 0.00s | 展開開始（scale 0→0.4） | B-1 ピンク発火（放射＆膨らみ） | — |',
  '| 0.10s | 拡大中 | B-2 緑発火 | — |',
  '| 0.15s | 拡大中 | — | popup 開始（scale 0→1.6・主役出現） |',
  '| 0.20s | 拡大中 | B-3 青発火 | 飛び出し中 |',
  '| ~0.55s | opacity ピーク | 各粒子が縮み始め（scale-out） | 1.04 へ戻る |',
  '| ~0.65s | 縮小へ | 放射終了 | 1.1 へ再弾み |',
  '| ~0.85s | 縮小中 | 消滅 | 1.04 で着地 |',
  '| 1.10s | 消滅（最後に残る） | — | — |',
].join('\n')

const meta = {
  title: 'Animations/Heart Like/Particle Burst',
  component: HeartParticleBurst,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Twitter/X の「いいね」に最も近い王道。中央の塗りハートが弾み、粒子が放射状に飛び、リングが広がる。\n\n' +
          TIMELINE,
      },
    },
  },
  argTypes: {
    colors: {
      description: '塗りハートの色。1 色なら単色、2 色以上ならグラデーション。',
      control: 'object',
    },
  },
} satisfies Meta<typeof HeartParticleBurst>

export default meta
type Story = StoryObj<typeof meta>

/** 単色: 1 色だけ渡す（参照元忠実） */
export const Solid: Story = {
  args: {
    colors: ['#fe587a'],
  },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

/** グラデーション: 2 色渡すと上から下へのグラデーションになる派生 */
export const Gradient: Story = {
  args: {
    colors: ['#ff8aa0', '#fe2f6d'],
  },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}
