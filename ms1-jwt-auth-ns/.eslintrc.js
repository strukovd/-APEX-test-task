module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir : __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		indent: [
			"error",
			"tab",
			{"SwitchCase": 1}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		semi: [
			"error",
			"always"
		],
		"brace-style": [
			"error",
			"stroustrup",
			{ "allowSingleLine": true }
		],

		// "max-len": ["error", {"code": 160}],
		"prefer-const": ["error", { "destructuring": "all", "ignoreReadBeforeAssign": false }],
		// "function-call-argument-newline": ["error", "never"],
		// "function-paren-newline": ["error", { "minItems": 10 }],
		"arrow-parens": [1, "as-needed", { "requireForBlockBody": false }],
		"no-unused-vars": ["error", { "argsIgnorePattern": "^_", "caughtErrorsIgnorePattern": "_" }],
		"no-use-before-define": ["error", { "functions": false }]
	}
};
