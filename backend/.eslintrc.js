module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": [2, "tab"],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 1,
        "eol-last": 0,
        "space-before-function-paren": 0,
        "no-trailing-spaces": 0,
        "keyword-spacing": 0,
        "allowEmptyReject": true
    }
};