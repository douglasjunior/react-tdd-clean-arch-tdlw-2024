import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    setupFiles: ['@testing-library/jest-dom/vitest'],
    environment: 'jsdom',
    clearMocks: true,
    globals: true
  },
}))
