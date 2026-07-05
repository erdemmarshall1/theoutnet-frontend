import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['font/*.ttf', 'font/*.woff', 'font/*.woff2', 'font/*.png', 'img/*.svg', 'img/*.png'],
      manifest: {
        name: 'THE OUTNET WHOLESALE',
        short_name: 'OUTNET WS',
        description: 'Wholesale luxury fashion marketplace',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'portrait-primary',
        icons: [
          { src: '/favicon.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/favicon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ttf,woff,woff2,png,svg,ico}'],
        navigateFallback: '/',
        navigateFallbackAllowlist: [/^\/$/],
        navigateFallbackDenylist: [/\/main\//, /\/home\//, /\/api\//],
        runtimeCaching: [
          {
            urlPattern: /\/main\/|\/home\/|\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'theoutnet-wholesale-api',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'theoutnet-wholesale-images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
    proxy: {
      '/main': { target: 'https://supportive-delight-production-b90c.up.railway.app', changeOrigin: true },
      '/home': { target: 'https://supportive-delight-production-b90c.up.railway.app', changeOrigin: true },
      '/api': { target: 'https://supportive-delight-production-b90c.up.railway.app', changeOrigin: true },
      '/uploads': { target: 'https://supportive-delight-production-b90c.up.railway.app', changeOrigin: true },
      '/socket.io': { target: 'https://supportive-delight-production-b90c.up.railway.app', ws: true },
    },
  },
})
