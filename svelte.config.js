import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess({})],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    files: {},
    csp: {
      reportOnly: {
        'default-src': ['self', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        'script-src': ['self'],
        'style-src': ['self', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        'img-src': ['self'],
        'connect-src': ['self'],
        'object-src': ['self'],
        'media-src': ['self'],
        'frame-src': ['self'],
        'child-src': ['self'],
        'form-action': ['self'],
        'frame-ancestors': ['none'],
        'base-uri': ['self'],
        'worker-src': ['none'],
        'manifest-src': ['none'],
        'report-uri': ['/report'],
      }
    },

    alias: {
      $lib: path.resolve('./src/lib')
    }
  }
};

export default config;
