const fs = require('fs');

const readAboutUs = () => { 
    const aboutUs = fs.readFileSync('./json-documents/about.json')
    const aboutUsJson = JSON.parse(aboutUs)

    return aboutUsJson
}

function save(req){
    const { id, texto } = req.body;
  
    // Read data.json
    let data = [];
    try {
      const jsonData = fs.readFileSync('./data.json', 'utf8');
      data = JSON.parse(jsonData);
    } catch (err) {
      throw err
    }
    // Add new Object to data array
    data.push({ id, texto });

    // write data array to my data.json
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
}

function read(req){
    const { id } = req.params;
    // Read data.json
    try {
      const jsonData = fs.readFileSync('data.json', 'utf8');
      const data = JSON.parse(jsonData);
      console.log(data)
  
      // search object from my data by id
      const script = data.find(item => item.id === id);
      return script
    } catch (err) {
      throw err
    }

  
}

module.exports = { readAboutUs, save, read }