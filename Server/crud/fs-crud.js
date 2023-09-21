const fs = require('fs');

const readAboutUs = () => { 
    const aboutUs = fs.readFileSync('./json-documents/about.json')
    const aboutUsJson = JSON.parse(aboutUs)

    return aboutUsJson
}

const save = (req) => {
    const { id, texto } = req.body;
  
    if (typeof id === 'undefined' || typeof texto === 'undefined') {
      throw err;
    }
  
    let data = [];
    try {    // Read data.json
      const jsonData = fs.readFileSync('./data.json', 'utf8');
      data = JSON.parse(jsonData);
  
      data.push({ id, texto });
  
      fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');     // write data array to my data.json
    } catch (err) {
      throw err;
    }
  };


  const read = (req) => {
    const { id } = req.params;
      
    try { // Read data.json
      const jsonData = fs.readFileSync('data.json', 'utf8');
      const data = JSON.parse(jsonData);
  
      const script = data.find((item) => item.id === id);     // search object from my data by id
  
      return script;
    } catch (err) {
      throw err;
    }
  };

module.exports = { readAboutUs, save, read }