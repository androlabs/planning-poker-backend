const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
  ],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),

  coverageDirectory: '__tests__/coverage',

  coverageProvider: 'v8',

  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: ['**/*.spec.ts'],

  // setupFiles: ['./jest-setup-file.ts', './jest-set-env-vars.ts'],
};
