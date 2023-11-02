const ScriptRepository = require('../repositories/ScriptsRepository')
const KeywordsRepository = require('../repositories/KeywordsRepository')

const { rejects } = require('assert');

const fs = require('fs').promises;

const readAboutUs = () => { 
  return new Promise((resolve, reject) =>{
    fs.readFile('./json-documents/about.json', 'utf-8')
    .then((aboutInfo) => {
      const aboutUsJson = JSON.parse(aboutInfo)
      resolve(aboutUsJson)
    }).catch((error) => {
      reject(error)
    })
  })
}

const readKeywords = () => {
  return KeywordsRepository.findAll()
};


const responseEval = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./evalResponse/ra_fake.txt', 'utf-8')
      .then((Fakedata) => {
        resolve(Fakedata); // Promise finished successfull return data in ra_fake.txt
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const save = ({ id, contenido }) => { 
  return ScriptRepository.create({id:id, contenido: contenido})
 }

 const read = ({ id }) => {
  return new Promise((resolve, reject) => {
    ScriptRepository.findAll()
      .then(scripts => {
        const foundScript = scripts.find(e => e.id == id);
        if (foundScript) {
          resolve(foundScript); // Resuelve la promesa con el script encontrado
        } else {
          reject(new Error('Script no encontrado')); // Rechaza la promesa con un error si no se encuentra el script
        }
      })
      .catch(error => {
        reject(error); // Rechaza la promesa si hay un error en la búsqueda de scripts
      });
  });
};


module.exports = { readAboutUs, save, read, responseEval, readKeywords }