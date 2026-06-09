import type { Meta, StoryObj } from '@storybook/react'
import LikeAnimation from './LikeAnimation'

const meta = {
  title: 'Animations/Rive',
  component: LikeAnimation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Rive で作った「いいね」アニメーション。`.riv` ファイルを `@rive-app/react-canvas` が ' +
          'canvas に描画する。アニメの中身は Rive エディタ側にあり、React からは ' +
          'ステートマシン（`state_machine` の `active` 入力）の値を切り替えて再生を制御する。' +
          'CSS アニメとは仕組みが異なり、コード側に keyframes は持たない。',
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number' },
      description: 'Width of the animation in pixels',
    },
    height: {
      control: { type: 'number' },
      description: 'Height of the animation in pixels',
    },
    autoplay: {
      control: { type: 'boolean' },
      description: 'Whether to autoplay the animation',
    },
    isActive: {
      control: { type: 'boolean' },
      description: 'Whether the like state is active',
    },
    onClick: {
      description: 'Callback when animation is clicked',
    },
    debug: {
      control: { type: 'boolean' },
      description: 'Show debug button and logging',
    },
  },
} satisfies Meta<typeof LikeAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 100,
    height: 100,
    autoplay: true,
    isActive: false,
    debug: false,
  },
}
