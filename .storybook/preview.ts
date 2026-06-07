import type { Preview } from '@storybook/react';
import './prose.css';

const preview: Preview = {
  parameters: {
    base: '/animation-ui-practice/',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
