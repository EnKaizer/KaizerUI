module.exports = {
"extends": "airbnb",
"parser": "babel-eslint",
"env": {
"browser": true,
"node": true,
"mocha": true
},
"plugins": [
"react"
],
"rules": {
"prefer-arrow-callback": 0,
"func-names": 0,
"no-alert": 0,
"import/extensions": 0,
"linebreak-style": ["error", "windows"],
"import/no-extraneous-dependencies": 0,
"import/no-unresolved": [2, { caseSensitive: false }],
"no-underscore-dangle": 0,
"no-unused-expressions": 0,
"no-use-before-define": 0,
"react/sort-comp": 0,
"indent": 0,
"object-curly-spacing": 0,
"space-before-blocks": 0,
"keyword-spacing": 0,
"semi": 0,
"arrows-parens": 0,
"comma-dangle": 0,
"arrow-body-style": 0,
"import/prefer-default-export": 0,
"react/jsx-indent": 0,
"react/jsx-indent-props": 0,
"react/no-multi-comp": 0,
"react/jsx-closing-bracket-location": 0,
"react/prefer-stateless-function": "off",
"react/require-default-props": 0,
"react/require-extension": 0
}
};