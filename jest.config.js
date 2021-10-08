const base = require('./jest.config.base')

module.exports = {
  ...base,
  roots: ['<rootDir>'],
  projects: [
    '<rootDir>/packages/web',
    '<rootDir>/packages/server',
    '<rootDir>/packages/engine'
  ]
}
