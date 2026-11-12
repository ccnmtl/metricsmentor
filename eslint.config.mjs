import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress';

export default defineConfig([
    js.configs.recommended,
    eslintReact.configs['recommended'],
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: {
            cypress: pluginCypress,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.amd,
                ...globals.jquery,
                ...globals.node,
                ...globals.mocha,
                ...globals.jest,
            },
            ecmaVersion: 2018,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: '19.2',
            },
        },
        rules: {
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'none',
                },
            ],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'max-len': [
                2,
                {
                    code: 80,
                    tabWidth: 4,
                    ignoreUrls: true,
                },
            ],
            'space-before-function-paren': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'no-trailing-spaces': ['error'],
            'key-spacing': [
                'error',
                {
                    beforeColon: false,
                },
            ],
            'func-call-spacing': ['error', 'never'],

            'cypress/assertion-before-screenshot': 'warn',
            'cypress/no-unnecessary-waiting': 'warn',
            'cypress/no-assigning-return-values': 'error',
            'cypress/no-force': 'warn',
            'cypress/no-pause': 'error',
            'cypress/no-async-tests': 'error',
        },
    },
]);
