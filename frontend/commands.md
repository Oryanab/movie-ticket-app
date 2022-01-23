### Commands Record:

1. npx create-react-app . --template typescript
2. .eslintrc=> {
   "env": {
   "browser": true,
   "es6": true,
   "jest": true
   },
   "extends": [
   "eslint:recommended",
   "plugin:react/recommended",
   "plugin:@typescript-eslint/recommended"
   ],
   "plugins": ["react", "@typescript-eslint"],
   "settings": {
   "react": {
   "pragma": "React",
   "version": "detect"
   }
   },
   "rules": {
   "@typescript-eslint/explicit-function-return-type": 0,
   "@typescript-eslint/explicit-module-boundary-types": 0
   }
   }
3. package.json=>scripts=>{..."lint": "eslint \"./src/\*_/_.{ts,tsx}\""}
4. npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
5. npm i --save-dev eslint-config-prettier eslint-plugin-prettier prettier
6. .prettierrc=>{
   "tabWidth": 2,
   "printWidth": 120,
   "singleQuote": true,
   "trailingComma": "es5",
   "arrowParens": "avoid",
   "semi": true
   }
7. npm i redux react-redux react-thunk
8. npm i --save-dev @types/react-redux @types/redux-thunk
9. npm install react-bootstrap
10. npm install --save-dev @types/react-bootstrap
