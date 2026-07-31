import type { Meta, StoryObj } from '@storybook/react'
import Rain from './Rain'
import tsx from './Rain.tsx?raw'
import css from './Rain.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS を出す */
const SOURCE = [
  '// マウント後に自動で降り始める。トリガー不要',
  '',
  '// 囲んで使う（children は紙吹雪と重なる。layer で前後を選ぶ）',
  '<Rain layer="both"><YourContent /></Rain>',
  '',
  '// 単体で使う（className / style でサイズ・位置を指定）',
  '<Rain style={{ width: 320, height: 320 }} />',
  '',
  '// ── Rain.tsx ──',
  tsx,
  '',
  '/* ── Rain.module.css ── */',
  css,
].join('\n')

const TIMELINE = [
  '### 時系列（マウント = 0 秒）',
  '',
  '弾ける confetti と違い、トリガー無しで自動開始し、一定速度でひらひら降り続ける。',
  '',
  '- **補充 `amount`**: 量を保つよう補充。初回だけ範囲全体に散らし「降っている途中」から始める',
  '- **落下**: 一定 `vy`/`vx`（重力加速なし）。`tilt` で斜めに傾き、`cos` の `scaleX` で翻る',
  '- **フェード**: 下端に近づくほど透明になる',
  '- **停止 `duration`**: 経過後は補充を止め、残りが下へ抜けたら終了（未指定なら無限）',
].join('\n')

const meta = {
  title: 'Animations/Confetti Rain/Rain',
  component: Rain,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '上からひらひら降ってくる紙吹雪。マウント後に自動開始し、囲んだ範囲の背面に降る。\n\n' +
          TIMELINE,
      },
    },
  },
  argTypes: {
    amount: { control: { type: 'number', min: 10, max: 300, step: 10 } },
    duration: { control: { type: 'number', min: 500, max: 20000, step: 500 } },
    speed: { control: { type: 'number', min: 0.3, max: 4, step: 0.1 } },
    layer: { control: 'inline-radio', options: ['back', 'front', 'both'] },
  },
  // 降る範囲を分かりやすくする暗い囲み枠
  decorators: [
    (Story) => (
      <div
        style={{
          width: 360,
          height: 360,
          borderRadius: 12,
          overflow: 'hidden',
          background: 'radial-gradient(120% 100% at 50% 0%, #1b2438 0%, #131a29 60%, #0c111c 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Rain>

export default meta
type Story = StoryObj<typeof meta>

// 紙片との前後関係が分かるよう、不透明パネルで囲った太字の中身（全 Story 共通）
const Panel = () => (
  <div style={{ display: 'grid', placeContent: 'center', width: '100%', height: '100%' }}>
    <div
      style={{
        padding: '20px 28px',
        borderRadius: 12,
        background: '#ffffff',
        color: '#131a29',
        letterSpacing: '0.2em',
        fontSize: 32,
        fontWeight: 800,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        userSelect: 'none',
      }}
    >
      CONFETTI
    </div>
  </div>
)

/** 背面のみ: パネルの後ろだけに降る（既定・duration 未指定 = 無限） */
export const Back: Story = {
  args: { amount: 60, speed: 1, layer: 'back', children: <Panel /> },
  parameters: { docs: { source: { code: SOURCE } } },
}

/** 前面のみ: パネルの上だけに降る */
export const Front: Story = {
  args: { amount: 40, speed: 0.5, layer: 'front', children: <Panel /> },
  parameters: { docs: { source: { code: SOURCE } } },
}

/** 前後で挟む: パネルの後ろに隠れる紙片と、上に重なる紙片の両方が出る */
export const Both: Story = {
  args: { amount: 80, speed: 1, layer: "both", children: <Panel /> },
  parameters: { docs: { source: { code: SOURCE } } },
}

/** 期間指定: 4 秒だけ多め・速めに降らせ、その後は自然に止まる */
export const Timed: Story = {
  args: { amount: 120, duration: 4000, speed: 1.6, layer: 'both', children: <Panel /> },
  parameters: { docs: { source: { code: SOURCE } } },
}

/** 単体使用: children を挟まず、style でサイズ・背景を指定して置く */
export const Standalone: Story = {
  args: {
    amount: 60,
    speed: 1,
    style: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      background: 'blue',
    },
  },
  parameters: { docs: { source: { code: SOURCE } } },
  decorators: [(Story) => (
    <Story />
    )
  ], // meta の囲み枠を外し、Rain 自身のサイズで表示
}
