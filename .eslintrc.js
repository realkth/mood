// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    // "vuex": false,
    // "vue-route": false,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // "vue": {
  //   "env": {
  //       "vuex": true,
  //       "vue-route": true,
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'no-unused-vars': 0,
    'no-redeclare': 0,
    'no-undef': 0,
    'no-new': 0,
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
    }
