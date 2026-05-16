import type { Meta, StoryObj } from '@storybook/react'
import Animation1 from '../pages/animation/hover-effect/animation-1'

const meta = {
  title: 'Animations/hover-effect',
  component: Animation1,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Animation1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
