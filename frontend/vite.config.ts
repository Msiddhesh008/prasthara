import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages project site: https://Msiddhesh008.github.io/prasthara/
export default defineConfig({
  base: '/prasthara/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'pwa/apple-touch-icon.png',
        'pwa/icon-192.png',
        'pwa/icon-512.png',
      ],
      manifest: {
        name: 'Prasthara',
        short_name: 'Prasthara',
        description:
          'Giving textiles a second life through thrifting and upcycling.',
        theme_color: '#f7f3ec',
        background_color: '#f7f3ec',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/prasthara/',
        scope: '/prasthara/',
        icons: [
          {
            src: 'pwa/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/prasthara/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      },
    }),
  ],
})
