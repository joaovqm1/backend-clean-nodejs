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
  collectCoverageFrom: [
    'src/data/**/*.ts',
    'src/infra/**/*.ts',
    '!src/infra/database/models/**.ts',
    '!src/infra/database/migrations/**.ts',
    '!src/infra/database/seeders/**.ts',
    '!src/infra/database/scripts/erd.ts',
    '!src/infra/database/utilities/default-fields.ts',
    '!src/infra/database/utilities/foreing-keys.ts',
    '!src/utilities/winston.ts',
    'src/presentation/**/*.ts',
    'src/third-party/**/*.ts',
    'src/utilities/**/*.ts'
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
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 98,
      lines: 98,
      statements: 98
    }
  },
  preset: 'ts-jest',
  testMatch: null,
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', { 'pageTitle': 'Test Report' }]
  ]
}
