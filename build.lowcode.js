module.exports = {
  alias: {
    '@': './src',
  },
  plugins: [
    [
      '@alifd/build-plugin-lowcode',
      {
        engineScope: "@alilc",
        extraAssets: [
          'https://unpkg.com/@alilc/antd-lowcode-materials@1.0.3/build/lowcode/assets-prod.json'
        ],
      },
    ],
  ],
};
