module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@store': './src/store',
          '@utils': './src/utils',
          '@firebase': './src/firebase',
          '@assets': './assets',
          '@components': './src/components',
          '@entities': './src/entities',
        },
      },
    ],
  ],
};
