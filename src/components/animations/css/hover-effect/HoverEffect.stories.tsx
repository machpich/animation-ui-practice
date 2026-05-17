import type { Meta, StoryObj } from '@storybook/react'
import HoverEffect from './HoverEffect'

const meta = {
  title: 'Animations/Hover Effect',
  component: HoverEffect,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverEffect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
