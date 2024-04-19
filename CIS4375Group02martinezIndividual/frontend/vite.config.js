import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: false, // Disables the full-screen error overlay
    },
    proxy: {
      // Using the proxy option to forward API requests to the backend server
      '/auth': {
        target: 'http://localhost:3000', // The backend server URL
        changeOrigin: true, // needed for virtual hosted sites
        secure: false, // if you want to verify the SSL Certs
      },
    }
  },
  define: {
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
  },    
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false,
  __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true, // Set this to false in production if you want
});
