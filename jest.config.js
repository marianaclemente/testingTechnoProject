module.exports = {
  verbose: true,
  automock: false,

  roots: ["<rootDir>/src/", "<rootDir>/specs/"],
  moduleFileExtensions: ['js', 'vue', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/api/produtos.json',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
