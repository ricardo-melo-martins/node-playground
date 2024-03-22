const dir = process.cwd(),
      fs = require('fs'),
      dotenv = require('dotenv'),
      
      url = new URL(`file://${dir}/environments/.env`)
      
dotenv.config({ path: url, debug: true, override: true })

const envName = process.env.NODE_ENV

console.log(process.env.APP_NAME);

const refreshEnv = (envName) => {

    const fileNew = `./environments/${envName}.env`;

    if(!fs.existsSync(fileNew)){
        throw new Error('File not exists')
    }

    const envConfig = dotenv.parse(fs.readFileSync(fileNew))

    for (const key in envConfig) {
        process.env[key] = envConfig[key]
    }
}


refreshEnv(envName);

console.log(process.env.APP_NAME);
