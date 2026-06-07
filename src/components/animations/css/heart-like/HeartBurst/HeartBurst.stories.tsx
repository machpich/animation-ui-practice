import type { Meta, StoryObj } from '@storybook/react'
import HeartBurst from './HeartBurst'
import tsx from './HeartBurst.tsx?raw'
import css from './HeartBurst.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS の両方を出す */
const SOURCE = [
  '// 使い方',
  '<HeartBurst />',
  '',
  '// ── HeartBurst.tsx ──',
  tsx,
  '',
  '/* ── HeartBurst.module.css ── */',
  css,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒）',
  '',
  '列でレイヤーごとの動き、行で全体の流れが追える。',
  '',
  '- **A: パルスリング `.pulse`**（delay 0.2s / 継続 1.0s・ハート輪郭が広がる）',
  '- **B: ミニハート `.deco1〜5`**（上昇＆点滅 `fly` + 着地移動＆回転 `move`／各 0.8s・別方向）',
  '- **C: 塗りハート `.fill`**（`popup` delay 0.15s / 継続 0.7s・主役）',
  '',
  '| 時刻 | A: リング | B: ミニハート | C: 塗りハート |',
  '|---|---|---|---|',
  '| 0.15s | — | — | popup 開始（scale 0→1.6・主役が先に出る） |',
  '| 0.20s | 展開開始（scale 1→1.8） | — | 飛び出し中 |',
  '| 0.40s | 拡大中 | ① deco2 左下（-150%, 60%）へ | 1.04 へ戻る |',
  '| 0.50s | 拡大中 | ② deco4 右下（120%, 60%）へ | 1.1 へ再弾み |',
  '| 0.75s | opacity ピーク付近 | ③ deco3 右下（80%, 60%）へ | — |',
  '| ~0.85s | 拡大中 | 上昇中 | 1.04 で着地 |',
  '| 0.90s | 拡大中 | ④ deco1 左下（-100%, 60%）へ | — |',
  '| 1.10s | 縮小へ | ⑤ deco5 中央（-10%, 20%）へ（最後に発火） | — |',
  '| 1.20s | 消滅 | 上昇中 | — |',
  '| ~1.90s | — | 最後の deco5 が飛び終わる | — |',
].join('\n')

const meta = {
  title: 'Animations/Heart Like/Heart Burst',
  component: HeartBurst,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '小さなミニハートが舞うリッチ寄りの「いいね」。塗りハートが弾み、リングが広がり、ミニハートが次々に飛び散る。\n\n' +
          TIMELINE,
      },
    },
  },
} satisfies Meta<typeof HeartBurst>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}
