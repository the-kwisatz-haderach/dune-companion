module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.test\\.(js|ts)',
  verbose: true,
  testPathIgnorePatterns: ['/node_modules', '/dist']
}
