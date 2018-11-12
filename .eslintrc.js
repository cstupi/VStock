module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  globals: {
    expect: true
  }
}