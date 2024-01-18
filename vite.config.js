import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Đường dẫn của server backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
