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
 return ScriptRepository.finById(id)
};

module.exports = { readAboutUs, save, read, responseEval, readKeywords }