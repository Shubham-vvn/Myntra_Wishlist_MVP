import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myntra.wishlist',
  appName: 'Myntra',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
