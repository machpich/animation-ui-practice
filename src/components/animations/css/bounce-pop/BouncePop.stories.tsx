import type { Meta, StoryObj } from '@storybook/react'
import BouncePop from './BouncePop'
import tsx from './BouncePop.tsx?raw'
import css from './BouncePop.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS の両方を出す */
const SOURCE = [
  '// 使い方',
  '<BouncePop />',
  '<BouncePop durationMs={800} /> // ぷるんをゆっくり',
  '<BouncePop origin="bottom-left" /> // 出現の頂点（伸びる起点）をプリセットで変える',
  '<BouncePop origin="top 100px right 30px" /> // 生値でピンポイント指定もできる',
  '',
  '// ── BouncePop.tsx ──',
  tsx,
  '',
  '/* ── BouncePop.module.css ── */',
  css,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒 / 継続は durationMs で可変・既定 500ms）',
  '',
  'transform-origin（＝出現の頂点。既定 right top）を起点に縦横とも伸びる。頂点は origin prop で可変。',
  '開き（pop-in, ease-in-out）は山を 2 回、控えめに作って「ぽよんぽよん」と柔らかく弾んで落ち着く。',
  '閉じ（pop-out）は角へ引っ込む。',
  '',
  '- **box: 出現する div**',
  '',
  '| 進捗 | box: 開き（pop-in） |',
  '|---|---|',
  '| 0% | scale 0 / opacity 0（角に畳まれた状態） |',
  '| 40% | scale 1.08（1 山目・控えめに行き過ぎ） |',
  '| 60% | scale 0.97（やわらかく沈む） |',
  '| 80% | scale 1.03（2 山目・さらに小さく弾む＝減衰） |',
  '| 100% | scale 1（定寸に落ち着く） |',
].join('\n')

const meta = {
  title: 'Animations/Bounce Pop',
  component: BouncePop,
  // fixed 配置のモーダルを Story プレビュー枠内に閉じ込める。
  // ラッパーに transform を効かせると fixed の基準がビューポート→このラッパーになり、
  // 各 Story が自分の枠に収まって Docs で重ならない。
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 360, transform: 'translateZ(0)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '右上のメニューボタン（☰）を押すとモーダルが開き、ボタン直下の div がそこから' +
          '「ニョキッ」と縦横に伸びて現れる。もう一度押す（または背景クリック）で角へ引っ込んで閉じる。' +
          '伸びる速度は durationMs、出現の頂点（伸びる起点）は origin で外から渡せる。\n\n' +
          TIMELINE,
      },
    },
  },
} satisfies Meta<typeof BouncePop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

/** ぷるんをゆっくり（800ms）にした派生 */
export const Slow: Story = {
  args: { durationMs: 800 },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

/** 出現の頂点を下辺中央にした派生（下辺の中央から伸びる） */
export const OriginBottom: Story = {
  args: { origin: 'bottom' },
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}