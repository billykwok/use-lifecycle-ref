export default {
  injectGlobals: false,
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['*.ts', '!*.test.ts'],
  notify: true,
  notifyMode: 'always',
  verbose: true,
};
