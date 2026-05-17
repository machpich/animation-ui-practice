import type { Meta, StoryObj } from '@storybook/react'
import LikeAnimation from './LikeAnimation'

const meta = {
  title: 'Animations/Rive',
  component: LikeAnimation,
  parameters: {
    layout: 'centered',
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
