import importPlugin from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['.expo/**', 'node_modules/**', 'dist/**'] },
    {
        extends: [...tseslint.configs.recommended],
        plugins: {
            'import-x': importPlugin,
            perfectionist,
            prettier,
            react,
            'react-hooks': reactHooks,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            'prettier/prettier': 'error',

            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',

            'no-console': ['error', { allow: ['error', 'warn'] }],

            'react/jsx-sort-props': [
                'error',
                {
                    callbacksLast: true,
                    reservedFirst: true,
                    shorthandFirst: true,
                },
            ],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'import-x/order': [
                'error',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'pathGroups': [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern:
                                '{expo,expo-*,react-native,react-native-*,@shopify/*}',
                            group: 'external',
                            position: 'after',
                        },
                        { pattern: '@/**', group: 'internal' },
                    ],
                    'pathGroupsExcludedImportTypes': ['react'],
                    'newlines-between': 'always',
                    'alphabetize': { order: 'asc', caseInsensitive: true },
                },
            ],

            'perfectionist/sort-interfaces': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                    groups: ['unknown', 'callbacks'],
                    customGroups: [
                        {
                            groupName: 'callbacks',
                            elementNamePattern: 'on[A-Z].*',
                        },
                    ],
                },
            ],
            'perfectionist/sort-object-types': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                },
            ],
            'perfectionist/sort-named-imports': [
                'error',
                {
                    type: 'alphabetical',
                    order: 'asc',
                },
            ],
        },
    }
)
