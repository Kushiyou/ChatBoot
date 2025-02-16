// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: {}
})
