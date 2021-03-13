module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'js',
    'json',
    'node',
    'ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/(?!@foo)',
    '<rootDir>/src/domain/(?!@foo)',
    '<rootDir>/src/main/(?!@foo)',
    '<rootDir>/src/logger.ts',
    '<rootDir>/src/presentation/contracts/(?!@foo)',
    '<rootDir>/src/test/(?!@foo)'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: {
        warnOnly: true
      }
    }
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@foo)'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  /*   coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }, */
  preset: 'ts-jest',
  testMatch: null
}
