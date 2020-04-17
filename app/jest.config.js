const { pathsToModuleNameMapper } = require('ts-jest/utils')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/?(*.)+(spec|test).(js|ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  collectCoverageFrom: ['components/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/components/templates/widget-manager/',
  ],
  coverageReporters: ['html'],
  transformIgnorePatterns: ['<rootDir>/node_modules'],
}
