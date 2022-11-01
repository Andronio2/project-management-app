module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:import/recommended',
        'airbnb-typescript/base',
        'prettier',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        // Кастомные правила
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        // 'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};
