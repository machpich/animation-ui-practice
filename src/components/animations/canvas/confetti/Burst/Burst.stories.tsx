import type { Meta, StoryObj } from '@storybook/react'
import Burst from './Burst'
import tsx from './Burst.tsx?raw'
import css from './Burst.module.css?raw'
import shared from '../confetti.ts?raw'

/** Show code にパターン本体（.tsx）・実 CSS・共有の物理モジュールを出す */
const SOURCE = [
  '// 使い方',
  '<Burst />                                  // 既定（桜色 / rect+circle）',
  "<Burst shapes={['petal']} />               // 花びら形で桜吹雪に",
  '<Burst repeat={2} />                        // 1 秒差で 2 連発（パンッ…パンッ）',
  "<Burst colors={['#ffd6e0', '#ff8fab']} />  // 色を差し替え",
  '',
  '// ── Burst.tsx ──',
  tsx,
  '',
  '/* ── Burst.module.css ── */',
  css,
  '',
  '// ── confetti.ts（共有: 物理・描画・rAF ループ）──',
  shared,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒）',
  '',
  '中央 1 点で全 160 粒を生成し、あとは共通の物理（重力・抗力・回転）に任せる。',
  '',
  '- **A: 生成 `spawn`**（クリック時 1 回・中央から 0〜2π へ均等発射）',
  '- **B: 上昇/拡散**（初速 6〜16 が主役・放射状に広がる）',
  '- **C: 落下 `gravity`**（毎フレーム vy += 0.28・抗力 0.008 で減速）',
  '- **D: 消滅 `life`**（decay 0.006〜0.012 で徐々に透明化 → 画面外で除去）',
  '',
  '| 時刻 | A: 生成 | B: 上昇/拡散 | C: 落下 | D: 消滅 |',
  '|---|---|---|---|---|',
  '| 0.00s | 中央に 160 粒 | 全方位へ弾け出す | — | life 1.0 |',
  '| ~0.3s | — | 拡散ピーク（最も広がる） | 重力で減速開始 | わずかに減 |',
  '| ~1.0s | — | 勢いが尽きる | 落下が支配的に | 半透明化 |',
  '| ~2s | — | — | 下へ抜けていく | 画面外/life 0 で消滅 |',
].join('\n')

const meta = {
  title: 'Animations/Confetti/Burst',
  component: Burst,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '中央から全方位に弾けるバースト。1 点で大量に生成し、放射状に散ってから重力で落ちる。\n\n' +
          TIMELINE,
      },
    },
  },
  argTypes: {
    colors: { description: '紙片の色。ここからランダムに選ばれる。', control: 'object' },
    shapes: {
      description: "紙片の形。'rect' / 'circle' / 'petal' から選択（複数で混在）。",
      control: 'object',
    },
    repeat: {
      description: '発射回数。2 なら 1 秒差で 2 連発（パンッ…パンッ）。',
      control: { type: 'number', min: 1, max: 5, step: 1 },
    },
  },
} satisfies Meta<typeof Burst>

export default meta
type Story = StoryObj<typeof meta>

/** 既定: 桜色の紙片（rect + circle） */
export const Default: Story = {
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

/** 花びら形: shapes に petal を渡すと桜吹雪らしいしずく型になる */
export const Petal: Story = {
  args: {
    shapes: ['petal'],
  },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

/** 2 連発: repeat={2} で 1 秒差の「パンッ…パンッ」になる */
export const Double: Story = {
  args: {
    repeat: 2,
  },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}
