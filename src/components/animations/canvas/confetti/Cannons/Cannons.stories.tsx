import type { Meta, StoryObj } from '@storybook/react'
import Cannons from './Cannons'
import tsx from './Cannons.tsx?raw'
import css from './Cannons.module.css?raw'
import shared from '../confetti.ts?raw'

/** Show code にパターン本体（.tsx）・実 CSS・共有の物理モジュールを出す */
const SOURCE = [
  '// 使い方',
  '<Cannons />                      // 既定（桜色 / rect+circle）',
  "<Cannons shapes={['petal']} />   // 花びら形で桜吹雪に",
  '<Cannons repeat={2} />           // 1 秒差で 2 連発（パンッ…パンッ）',
  '',
  '// ── Cannons.tsx ──',
  tsx,
  '',
  '/* ── Cannons.module.css ── */',
  css,
  '',
  '// ── confetti.ts（共有: 物理・描画・rAF ループ）──',
  shared,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒）',
  '',
  '左右下隅の 2 砲台から、狭い角度・強い初速で斜め上へ撃ち出す。',
  '',
  '- **A: 左砲台**（左下 (0, h) から右上向き -90°〜-30°・初速 12〜22）',
  '- **B: 右砲台**（右下 (w, h) から左上向き -150°〜-210°・初速 12〜22）',
  '- **C: 山なり弾道**（強い初速で上昇 → 重力 vy += 0.28 で頂点から落下）',
  '- **D: 消滅 `life`**（decay 0.006〜0.012 で透明化 → 除去）',
  '',
  '| 時刻 | A: 左砲台 | B: 右砲台 | C: 弾道 | D: 消滅 |',
  '|---|---|---|---|---|',
  '| 0.00s | 右上へ 90 粒 | 左上へ 90 粒 | 勢いよく上昇 | life 1.0 |',
  '| ~0.4s | — | — | 中央上空で交差・頂点 | わずかに減 |',
  '| ~1.0s | — | — | 落下に転じる | 半透明化 |',
  '| ~2s | — | — | 下へ抜ける | 画面外/life 0 で消滅 |',
].join('\n')

const meta = {
  title: 'Animations/Confetti/Cannons',
  component: Cannons,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '左右の下からクラッカーのように発射するキャノン。2 方向の噴射が中央上空で交差する。\n\n' +
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
} satisfies Meta<typeof Cannons>

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
