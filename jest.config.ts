const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/src/application/**/*.ts',
    '<rootDir>/src/infra/mongodb/repos/**/*.ts',
    '!<rootDir>/src/main/**',
  ],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),

  coverageDirectory: 'coverage',

  coverageProvider: 'babel',

  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: ['**/*.spec.ts'],

  setupFiles: ['./jest-setup-file.ts', './jest-set-env-vars.ts'],

  resetMocks: true,
};
