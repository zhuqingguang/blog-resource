module.exports = {
    env: {
        node: true,
        es2020: true,
    },
    extends: [
        'standard',
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        indent: [ 'error', 4 ],
        'comma-dangle': [ 'warn', 'always-multiline' ],
        'array-bracket-spacing': [ 'warn', 'always' ],
        'no-unused-vars': [ 'warn' ],
    },
}
