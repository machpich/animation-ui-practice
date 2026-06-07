import type { Meta, StoryObj } from '@storybook/react'
import HeartCheckboxPure from './HeartCheckboxPure'
import { heartCheckboxHtml } from './heartCheckbox.html'

/** Show code に、そのままブラウザで開ける pure HTML + CSS を出す */
const SOURCE = `<!-- そのまま .html に保存してブラウザで開けば動く（<style> 同梱） -->\n${heartCheckboxHtml.trim()}`

const meta = {
  title: 'Animations/Heart Like/Checkbox (Pure HTML+CSS)',
  component: HeartCheckboxPure,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'React を使わず pure HTML + CSS だけで作った Particle Burst 版。' +
          '状態管理は `<input type="checkbox">` の `:checked`、`<label>` で全体を囲んでクリックでトグル、' +
          '`:checked ~ ... display:block` でエフェクトを発火させる。\n\n' +
          '動き（レイヤー・時系列）は **Particle Burst** と同一。',
      },
    },
  },
} satisfies Meta<typeof HeartCheckboxPure>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { source: { code: SOURCE, language: 'html' } },
  },
}
