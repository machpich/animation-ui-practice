import type { Meta, StoryObj } from '@storybook/react'
import Animation1 from '../pages/animation/hover-effect/animation-1'
import RiveAnimation1 from '../pages/animation/rive/rive-animation-1'

const meta = {
  title: 'Gallery',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Animations: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '2rem',
      padding: '2rem',
    }}>
      <div>
        <h3>hover-effect</h3>
        <Animation1 />
      </div>
      <div>
        <h3>Rive</h3>
        <RiveAnimation1 />
      </div>
    </div>
  ),
}
