import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default [
    {
        files: ['public/app/**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                codex: true,
                VERSION: true,
                ActiveXObject: true
            }
        },

        plugins: {
            '@stylistic': stylistic
        },

        rules: {

            '@stylistic/arrow-spacing': [2, {
                before: true,
                after: true
            }],

            /** Variables */
            'no-delete-var': 2,
            'no-label-var': 2,
            'no-shadow-restricted-names': 2,
            'no-shadow': 2,
            'no-undef-init': 2,
            'no-undef': 2,
            'no-unused-vars': 1,

            /** Style */
            '@stylistic/array-bracket-spacing': [2, 'never', {
                singleValue: true,
                objectsInArrays: true,
                arraysInArrays: true
            }],
            '@stylistic/quotes': [1, 'single', {
                avoidEscape: true
            }],
            eqeqeq: 0,
            '@stylistic/brace-style': [2, '1tbs'],

            '@stylistic/comma-spacing': [2, {
                before: false,
                after: true
            }],
            '@stylistic/comma-style': [2, 'last'],
            '@stylistic/eol-last': 0,
            'no-nested-ternary': 1,
            '@stylistic/no-trailing-spaces': 2,
            '@stylistic/no-mixed-spaces-and-tabs': 2,
            '@stylistic/padded-blocks': [2, 'always'],
            '@stylistic/space-before-blocks': 1,
            '@stylistic/space-before-function-paren': [1, {
                anonymous: 'always',
                named: 'never'
            }],
            '@stylistic/spaced-comment': [2, 'always', {
                exceptions: ['-', '+'],
                markers: ['=', '!']
            }],
            '@stylistic/semi': [2, 'always'],
            '@stylistic/indent': [2, 4, {
                SwitchCase: 1
            }],
            camelcase: [2, {
                properties: 'always'
            }],

            /** Blank line after variable declarations */
            '@stylistic/padding-line-between-statements': [1,
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
            ]

        }
    }
];
