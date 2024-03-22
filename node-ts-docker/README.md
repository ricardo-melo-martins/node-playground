
### inicia um projeto npm

```bash

$ npm init

```

### instala typescript

```bash

$ npm i typescript --save-dev

```


### Inicializa arquivo de configuracao tsconfig.json

```bash

$ npx tsc --init

```

### Update tsconfig.json

```bash

"baseUrl": "./src"
"target": "ES2021"
"moduleResolution": "node"
"outdir": "./build"


```


### instala o express

```bash

$ npm i --save express
$ npm i -D @types/express

```


Na pasta `src/` criar index.ts


```bash

import express from 'express';

const app = express();

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});


```


### instala nodemon

```bash

npm i -D ts-node nodemon

```

### criar arquivo nodemon.json
```bash

{
  "verbose": true,
  "ignore": [],
  "watch": ["src/**/*.ts"],
  "execMap": {
    "ts": "node --inspect=0.0.0.0:9229 --nolazy -r ts-node/register"
  }
}

```


### Alterando o package.json

```bash
"scripts": {
    "start": "NODE_PATH=./build node build/index.js",
    "build": "tsc -p .",
    "dev": "nodemon src/index.ts",
}

```



















