module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/host/**/*.{js,jsx,ts,tsx}',
    './src/remote/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Tailwind CSS v4 特有配置
  future: {
    // v4 中推荐的默认配置
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'selector',  // v4 中更改为 'selector' 而不是 'class'
}
