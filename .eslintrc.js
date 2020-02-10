module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // '@typescript-eslint/member-delimiter-style': [
    //   {
    //     'multiline': {
    //         'delimiter': 'none',
    //         'requireLast': false
    //     },
    //     'singleline': {
    //         'delimiter': 'semi',
    //         'requireLast': false
    //     },
    //   }
    // ]
  }
}
