module.exports = {
  extends: ['airbnb-base', 'prettier'],
  // babel-eslint parser is used to support experimental features not supported in ESLint itself yet
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true, //enable global strict mode (if ecmaVersion is 5 or greater)
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'linebreak-style': 0,
    'linebreak-style': [0, 'error', 'windows'],
    'no-underscore-dangle': [0],
    // configure the prettier plugin
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: false,
      },
    ],
  },
  plugins: ['prettier']
};
