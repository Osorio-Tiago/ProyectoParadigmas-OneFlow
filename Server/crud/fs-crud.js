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
  return new Promise((resolve, reject) => {
    fs.readFile('./json-documents/keywords.json', 'utf8')
      .then((Keywordsdata) => {
        const keywordsJson = JSON.parse(Keywordsdata);
        resolve(keywordsJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
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

const save = ({ id, texto }) => {
  return new Promise((resolve, reject) => {
    if (typeof id === 'undefined' || typeof texto === 'undefined') {
      reject(new Error("ID y texto son campos requeridos."));
      return;
    }


    fs.readFile('./json-documents/data.json', 'utf8')
      .then((data) => {
        const jsonData = JSON.parse(data);

        const existData = jsonData.find((item) => item.id === id);
        
        existData ?
          existData.texto = texto : 
          jsonData.push({ id, texto });
        

        return fs.writeFile('./json-documents/data.json', JSON.stringify(jsonData, null, 2), 'utf8');
      })
      .then(() => {
        resolve(); // Promise finished successfull
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const read = ({ id }) => {

  return fs.readFile('./json-documents/data.json', 'utf8')
    .then((jsonData) => {
      const data = JSON.parse(jsonData);

      const script = data.find((item) => item.id === id);  // search object from my data by id
      return script;
    })
    .catch((err) => {
      throw err;
    });
};



module.exports = { readAboutUs, save, read, responseEval, readKeywords }