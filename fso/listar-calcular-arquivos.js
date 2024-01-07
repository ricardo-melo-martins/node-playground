// Copyright (c) 2024 RMM.
// Licensed under the MIT License.

// Encontrar e calcular arquivos
// node ./fso/listar-calcular-arquivos.js

const fs = require("fs").promises;
const path = require("path");

const pathTemp = '../tmp';
const pathData = '../data/funcionarios';
const itemFileExt = '.json';
const fileTemp = 'funcionarios-salarios-total.txt';

async function calculateTotal(dataFiles) {
  
  let dataTotal = 0;
  
  for (file of dataFiles) {
    
    const fileContents = await fs.readFile(file)

    const data = JSON.parse(fileContents);

    dataTotal += data.total;
  }
  return dataTotal;
}

async function findFiles(folderName) {

  let results = [];
  const items = await fs.readdir(folderName, { withFileTypes: true });

  for (const item of items) {

    if (item.isDirectory()) {

      const resultsReturned = await findFiles(path.join(folderName, item.name));
      results = results.concat(resultsReturned);
    } else {
      if (path.extname(item.name) === itemFileExt)
        results.push(`${folderName}/${item.name}`);
    }
  }

  return results;
}

async function writeFile(pathDir, file, data){
    const pathFile = path.join(pathDir, file);
    await fs.writeFile(
        pathFile, `${data}\r\n`, { flag: "a" }
      );
      console.log(`Arquivo ${pathFile} foi escrito`);  
}

async function main() {
  const filesDir = path.join(__dirname, pathData);
  const tmpDir = path.join(__dirname, pathTemp);

  try {
    await fs.mkdir(tmpDir);
  } catch {
    console.log(`Diretório ${tmpDir} já foi criado antes.`);
  }

  const listFiles = await findFiles(filesDir);
  const calculatedTotal = await calculateTotal(listFiles);
  
  await writeFile(tmpDir, fileTemp, calculatedTotal);
  
}

main();