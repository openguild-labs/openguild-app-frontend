module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/no-explicit-any":"off",
      "@typescript-eslint/no-unused-vars" : "off",
      "react-hooks/exhaustive-deps" :"off",
      "react-refresh/only-export-components":"off",
      "no-prototype-builtins" :"off",
      "react-hooks/rules-of-hooks":"off",
  },
}
