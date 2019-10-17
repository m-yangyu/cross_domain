const fs = require('fs');
const path = require('path');
let env = process.env.NODE_ENV;

const setEnv = () => {
    fs.writeFileSync(path.resolve(__dirname,'./node_env.json'),JSON.stringify({env}),{
        encoding: 'utf8'
    });
}

const getConfigFile = (fileName) => {

    !env ?
    env = JSON.parse( fs.readFileSync(path.resolve(__dirname,'./node_env.json')).toString() ).env :
    setEnv();

    switch(env){
        case 'win32':
            return `../../../${fileName}`;
        case 'darwin':
            return `../../../../../${fileName}`;
        default:
            return `../${fileName}`;
    }
}
const readConfig = () => {

    const fileData = fs.readFileSync( path.resolve(__dirname, getConfigFile('config.json')));
    return JSON.parse(fileData.toString());

}

module.exports = {
    readConfig: readConfig,
    setEnv:setEnv,
}
