module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: false,
  coveragePathIgnorePatterns: ['/types/', 'index.ts', 'types.ts'],
};
