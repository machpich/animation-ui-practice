import type { Meta, StoryObj } from '@storybook/react'
import HoverEffect from './HoverEffect'
import tsx from './HoverEffect.tsx?raw'
import css from './HoverEffect.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS の両方を出す */
const SOURCE = [
  '// 使い方',
  '<HoverEffect />',
  '',
  '// ── HoverEffect.tsx ──',
  tsx,
  '',
  '/* ── HoverEffect.module.css ── */',
  css,
].join('\n')

const meta = {
  title: 'Animations/Hover Effect',
  component: HoverEffect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'hover で 2 枚の画像がディストーション付きで切り替わる（`hover-effect` ライブラリ）。' +
          'グレースケール画像を変位マップに使うことで、溶けるような遷移を作る。',
      },
    },
  },
} satisfies Meta<typeof HoverEffect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}
