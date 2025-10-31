import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  collectCoverageFrom: [
    'src/services/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};

export default config;