import type { Meta, StoryObj } from '@storybook/react'
import AutoCarouselMotion from './AutoCarouselMotion'
import { carouselTiles } from '../carouselTiles'
import tsx from './AutoCarouselMotion.tsx?raw'
import css from './AutoCarouselMotion.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS の両方を出す */
const SOURCE = [
  '// 使い方',
  '<AutoCarouselMotion>{tiles}</AutoCarouselMotion>',
  '<AutoCarouselMotion speed={80}>{tiles}</AutoCarouselMotion>       // 速く流す（px/秒）',
  '<AutoCarouselMotion direction="right">{tiles}</AutoCarouselMotion> // 右へ流す',
  '<AutoCarouselMotion pauseOnHover>{tiles}</AutoCarouselMotion>      // ホバーで停止',
  '',
  '// ── AutoCarouselMotion.tsx ──',
  tsx,
  '',
  '/* ── AutoCarouselMotion.module.css ── */',
  css,
].join('\n')

const TIMELINE = [
  '### 時系列（毎フレーム更新・無限ループ）',
  '',
  'children を 2 セット並べ、帯の x を毎フレーム speed×Δt だけ進める。',
  'x が 1 セット分に達したら剰余で 0 へ巻き戻す＝見た目を変えずに無限ループ。',
  '',
  '- **track: 流れる帯**（x を `useAnimationFrame` で毎フレーム更新）',
  '- ホバー停止は「フレーム更新をスキップするだけ」。位置はそのまま保持される。',
  '',
  '| フレーム | track: x | 見た目 |',
  '|---|---|---|',
  '| 開始 | 0 | 1 セット目が窓を占める |',
  '| 途中 | -oneSetWidth×0.5 | 1・2 セット目の境目が流れる |',
  '| ラップ | -oneSetWidth → 0 | 剰余で頭へシームレスに戻る |',
].join('\n')

const meta = {
  title: 'Animations/Auto Carousel/Motion',
  component: AutoCarouselMotion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'motion/react（Framer Motion）で作る無限オートカルーセル。帯の x を毎フレーム進め、' +
          '1 セット分で剰余ラップして継ぎ目なくループする。速度変更やホバー停止の制御に強い。\n\n' +
          TIMELINE,
      },
    },
  },
} satisfies Meta<typeof AutoCarouselMotion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: carouselTiles },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

/** 右へ流す派生 */
export const RightDirection: Story = {
  args: { children: carouselTiles, direction: 'right' },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

/** ホバーで停止する派生（マウスを載せると流れが止まる） */
export const PauseOnHover: Story = {
  args: { children: carouselTiles, pauseOnHover: true, speed: 60 },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}
