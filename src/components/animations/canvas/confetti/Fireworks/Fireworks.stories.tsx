import type { Meta, StoryObj } from '@storybook/react'
import Fireworks from './Fireworks'
import tsx from './Fireworks.tsx?raw'
import css from './Fireworks.module.css?raw'
import shared from '../confetti.ts?raw'

/** Show code にパターン本体（.tsx）・実 CSS・共有の物理モジュールを出す */
const SOURCE = [
  '// 使い方',
  '<Fireworks />                       // 既定（桜色 / rect+circle）',
  "<Fireworks shapes={['petal']} />    // 花びら形で桜吹雪に",
  '<Fireworks repeat={2} />            // 1 秒差で 2 連発（パンッ…パンッ）',
  '',
  '// ── Fireworks.tsx ──',
  tsx,
  '',
  '/* ── Fireworks.module.css ── */',
  css,
  '',
  '// ── confetti.ts（共有: 物理・描画・rAF ループ）──',
  shared,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒）',
  '',
  '上半分の 3 箇所を打ち上げ点にして、各点 80 粒を放射状に開かせる。',
  '',
  '- **A: 打ち上げ点 ×3**（画面上部 20〜80% x / 20〜50% y にばらけて配置）',
  '- **B: 開花**（各点から 0〜2π へ初速 4〜11・玉が開いたように広がる）',
  '- **C: 落下 `gravity`**（vy += 0.28・抗力 0.008）',
  '- **D: 消滅 `life`**（decay 0.006〜0.012 で透明化 → 除去）',
  '',
  '| 時刻 | A: 打ち上げ点 | B: 開花 | C: 落下 | D: 消滅 |',
  '|---|---|---|---|---|',
  '| 0.00s | 3 点に各 80 粒 | 各点で全方位に開く | — | life 1.0 |',
  '| ~0.3s | — | 開ききる（最大径） | 減速開始 | わずかに減 |',
  '| ~1.0s | — | 勢いが尽きる | 落下が支配的に | 半透明化 |',
  '| ~2s | — | — | 下へ抜ける | 画面外/life 0 で消滅 |',
].join('\n')

const meta = {
  title: 'Animations/Confetti/Fireworks',
  component: Fireworks,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '複数箇所で連続して打ち上がる花火。上半分の 3 点でそれぞれ玉が開くように弾ける。\n\n' +
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
} satisfies Meta<typeof Fireworks>

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
