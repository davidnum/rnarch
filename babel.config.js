module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ios.tsx',
          '.android.tsx',
          '.ts',
          '.tsx',
          '.json',
          '.native.ts',
          '.native.tsx',
        ],
        alias: {
          '^#(.+)': './src/\\1',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-transform-typescript-metadata',
  ],
  overrides: [
    {
      test: fileName => !fileName.includes('node_modules'),
      plugins: [
        [require('@babel/plugin-proposal-class-properties'), { loose: false }],
      ],
    },
  ],
};
