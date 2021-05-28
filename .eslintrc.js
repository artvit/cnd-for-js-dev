module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'koa'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    quotes: ['error', 'single']
  }
};
