import type { Meta, StoryObj } from '@storybook/react'
import HeartCrossBeam from './HeartCrossBeam'
import tsx from './HeartCrossBeam.tsx?raw'
import css from './HeartCrossBeam.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS の両方を出す */
const SOURCE = [
  '// 使い方',
  '<HeartCrossBeam />',
  '',
  '// ── HeartCrossBeam.tsx ──',
  tsx,
  '',
  '/* ── HeartCrossBeam.module.css ── */',
  css,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒）',
  '',
  '列でレイヤーごとの動き、行で全体の流れが追える。各バーは `overflow:hidden` のスリットで、',
  '中の `::after`（光の線）が `translateY` で通り抜けることで「光が走った」ように見える。',
  '',
  '- **cross0**: line 細線 / 45° / ピンク / delay 0s・継続 0.45s / 上→下',
  '- **cross1**: seg 節 / 傾きなし（縦横） / 黄 / delay 0.3s・継続 1.0s / 下→上',
  '- **cross2**: seg 節 / 45° / 黄 / delay 0.4s・継続 1.0s / 下→上',
  '- **C: 塗りハート `.heartFill`**: `popup` delay 0.2s / 継続 0.7s・主役',
  '',
  '| 時刻 | cross0（ピンク細線） | cross1（黄・縦横） | cross2（黄・斜め） | C: 塗りハート |',
  '|---|---|---|---|---|',
  '| 0.00s | 上→下へ一閃開始 | — | — | — |',
  '| 0.20s | 走行中 | — | — | popup 開始（主役出現） |',
  '| 0.30s | 走行中 | 下→上へ流れ始める | — | 飛び出し中 |',
  '| 0.40s | 抜け際 | 流れ中 | 下→上へ流れ始める（cross1 を追走） | 戻り／再弾み |',
  '| 0.45s | 枠外へ抜けて消滅 | 流れ中 | 流れ中 | — |',
  '| ~0.90s | — | 流れ中 | 流れ中 | 着地 |',
  '| 1.30s | — | 流れ終了 | 流れ中 | — |',
  '| 1.40s | — | — | 流れ終了（最後に消える） | — |',
].join('\n')

const meta = {
  title: 'Animations/Heart Like/Cross Beam',
  component: HeartCrossBeam,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '粒子を使わず「線の動き」だけで成立させる技巧的な「いいね」。鋭い一閃のあと、黄の光が二重に追走する。\n\n' +
          TIMELINE,
      },
    },
  },
} satisfies Meta<typeof HeartCrossBeam>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}
