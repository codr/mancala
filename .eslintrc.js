module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    // "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            {
              "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": [
          2,
          "always-multiline"
        ],
        "no-unused-vars": [
          "error",
          {
            "varsIgnorePattern": "React"
          }
        ],
        "react/jsx-uses-vars": 1,
        "eol-last": "error",
    }
};
