import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', // nextui 相关
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector', // 修改主题切换的模式, see: https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  plugins: [
    nextui(), // nextui 相关
  ],
};

export default config;
