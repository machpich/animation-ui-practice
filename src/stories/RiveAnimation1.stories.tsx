import type { Meta, StoryObj } from '@storybook/react'
import RiveAnimation1 from '../pages/animation/rive/rive-animation-1'

const meta = {
  title: 'Animations/Rive',
  component: RiveAnimation1,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RiveAnimation1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
