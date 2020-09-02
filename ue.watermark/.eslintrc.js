module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['google', 'babel'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: "@typescript-eslint/parser",
  plugins: ['@typescript-eslint'],
  rules: {
    'no-async-promise-executor': 0,
    // 'typescript/class-name-casing': 'error'
    'quotes': 0,
    'camelcase': 0,
    'new-cap': 0,
    'linebreak-style': 0, //是否统一换行符
    'require-jsdoc': 0,
    'valid-jsdoc': 0,
    'no-invalid-this': 0, // 允许this
    'no-unused-vars': 0, //  允许声明后不使用的变量
    'max-len': 0, // 允许每行长度随意
    'guard-for-in': 0,

    'no-prototype-builtins': 0,
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }] //对象是否前后有空格
  }
};
