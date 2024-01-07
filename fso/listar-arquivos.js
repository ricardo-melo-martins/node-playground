// Copyright (c) 2024 RMM.
// Licensed under the MIT License.

// Encontrar arquivos
// node ./fso/listar-arquivos.js

const path = require("path");
const fs = require("fs").promises;

const pathData = 'data/funcionarios';
const itemFile = 'salario.json';

async function findFiles(folderName) {

  let results = [];

  const items = await fs.readdir(folderName, { withFileTypes: true });

  for (const item of items) {

    if (item.isDirectory()) {

      const resultsReturned = await findFiles(`${folderName}/${item.name}`);
      results = results.concat(resultsReturned);
    } else {
      if (item.name === itemFile) {
        results.push(`${folderName}/${item.name}`);
      }
    }
  }

  return results;
}

async function main() {
  const results = await findFiles(pathData);
  console.log(results);
}

main();