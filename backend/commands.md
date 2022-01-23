### Commands Record:

1. npm init -y
2. npm install typescript --save-dev
3. "scripts": {
   "tsc": "tsc"
   },
4. npm run tsc -- --init
5. tsconfig => {
   "compilerOptions": {
   "target": "ES6",
   "outDir": "./build/",
   "module": "commonjs",
   "strict": true,
   "noUnusedLocals": true,
   "noUnusedParameters": true,
   "noImplicitReturns": true,
   "noFallthroughCasesInSwitch": true,
   "esModuleInterop": true
   }
   }
6. npm install express
7. npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
8. .eslint => {
   "extends": [
   "eslint:recommended",
   "plugin:@typescript-eslint/recommended",
   "plugin:@typescript-eslint/recommended-requiring-type-checking"
   ],
   "plugins": ["@typescript-eslint"],
   "env": {
   "browser": true,
   "es6": true,
   "node": true
   },
   "rules": {
   "@typescript-eslint/semi": ["error"],
   "@typescript-eslint/explicit-function-return-type": "off",
   "@typescript-eslint/explicit-module-boundary-types": "off",
   "@typescript-eslint/restrict-template-expressions": "off",
   "@typescript-eslint/restrict-plus-operands": "off",
   "@typescript-eslint/no-unsafe-member-access": "off",
   "@typescript-eslint/no-unused-vars": [
   "error",
   { "argsIgnorePattern": "^_" }
   ],
   "no-case-declarations": "off"
   },
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
   "project": "./tsconfig.json"
   }
   }
9. npm install --save-dev ts-node-dev
10. package.json=>scripts=>"scripts": {
    "tsc": "tsc",
    "start": "ts-node-dev index.ts",
    "lint": "eslint --ext .ts ."
    },
11. npm install --save-dev @types/express
12. npm i cors
13. npm install --save-dev @types/cors
14. npm install --save-dev nodemon
15. package.json=>scripts=>{..."dev": "nodemon ./server/index.ts"}
16. tsconfig => {... "resolveJsonModule": true}
17. npm install --save-dev eslint-config-prettier
