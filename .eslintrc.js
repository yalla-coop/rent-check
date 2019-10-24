module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ["prettier", "jest"],
  rules: {
    // configure the prettier plugin
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false,
      },
    ],
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "func-names": 0,
  },
};
