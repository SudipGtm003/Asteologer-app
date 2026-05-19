import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        kundali: resolve(__dirname, 'kundali.html'),
        rashifal: resolve(__dirname, 'rashifal.html'),
        calender: resolve(__dirname, 'calender.html'),
        marriage: resolve(__dirname, 'marriage.html'),
        relationship: resolve(__dirname, 'relationship.html'),
        rashi_name: resolve(__dirname, 'rashi-from-name.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        ai_consultation: resolve(__dirname, 'ai-consultation.html')
      }
    }
  }
});

