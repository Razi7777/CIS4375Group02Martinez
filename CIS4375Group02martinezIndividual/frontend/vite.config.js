import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // HMR overlay configuration correctly placed here
  server: {
    hmr: {
      overlay: false, // Disables the full-screen error overlay
    },
  },


    define: {
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    },    
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true, // Set this to false in production if you want

});
