const fs = require('fs').promises;

const readAboutUs = () => { 
    const aboutUs = fs.readFileSync('./json-documents/about.json')
    const aboutUsJson = JSON.parse(aboutUs)

    return aboutUsJson
}

/*
const readKeywords = () => { 
  const keywords = fs.readFileSync('./json-documents/keywords.json')
  const keywordsJson = JSON.parse(keywords)
  return keywordsJson
}
*/


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

const save = (req) => {
  return new Promise((resolve, reject) => {
    const { id, texto } = req.body;

    if (typeof id === 'undefined' || typeof texto === 'undefined') {
      reject(new Error("ID y texto son campos requeridos."));
      return;
    }


    fs.readFile('./data.json', 'utf8')
      .then((data) => {
        const jsonData = JSON.parse(data);

        const existData = jsonData.find((item) => item.id === id);
        
        existData ?
          existData.texto = texto : 
          jsonData.push({ id, texto });
        

        return fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), 'utf8');
      })
      .then(() => {
        resolve(); // Promise finished successfull
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const read = (req) => {
  const { id } = req.params;

  return fs.readFile('data.json', 'utf8')
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