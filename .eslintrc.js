module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:jest/recommended",
    "prettier/react",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ["prettier", "jest", "react", "react-hooks"],
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
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/label-has-associated-control": 0,
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/label-has-for": 0,
    "consistent-return": 0,
    "import/prefer-default-export": 0,
    "react/jsx-no-undef": 1,
    "linebreak-style": 0,
    "linebreak-style": [0, "error", "windows"],
    "react/prop-types": [0],
    "no-underscore-dangle": [0],
    "react/prefer-stateless-function": [0],
  },
};
