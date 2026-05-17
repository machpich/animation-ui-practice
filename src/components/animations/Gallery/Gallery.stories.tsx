import type { Meta, StoryObj } from '@storybook/react'
import Gallery from './Gallery'

const meta = {
  title: 'Gallery',
  component: Gallery,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Gallery>

export default meta
type Story = StoryObj<typeof meta>

export const Animations: Story = {}
