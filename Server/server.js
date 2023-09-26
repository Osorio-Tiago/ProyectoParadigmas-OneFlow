const express = require('express')
const crud = require('./crud/fs-crud.js')
const bodyParser = require('body-parser');
const app = express()
const port = 3001

const server = app.listen(port, () => console.log('Server working on port ' + port))

app.use(bodyParser.json());


app.get("/api", (req, res) => {
    res.json({ "users" : ["Santiago", "Dylan", "Jose", "Paula" ]})
})


app.get("/keywords", (req, res) => {
  crud.readKeywords()
    .then((keywordsJson) => {
      res.json(keywordsJson);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al leer las palabras clave' });
    });
});

// GET METHOD RETURN ABOUT US INFO
app.get('/', (req, res) => {
    res.json(crud.readAboutUs())
})


//  POST METHOD RETURN SAME TEXT WITH TIMESTAMP ON THE BEGINNING
app.post('/compile', (req, res) =>{
    const timestampedText = `${new Date().toISOString()}: ${req.body.text}`; // Add timestamp to received text
    res.json({result : timestampedText}) // Returns json with timestamp + received text
})

//  POST METHOD WE DON'T KNOW WHAT THIS HAVE TO DO 
app.post('/eval', (req, res) =>{
    crud.responseEval().then((script) =>{
        script ? 
            res.status(200).json(script) : 
            res.status(404).json({ message: 'No se pudo evaluar la expresion' })
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error interno del servidor' });
    })
})
// LOAD AND SAVE SCRIPTS


  app.post('/script/save', (req, res) => {
    crud.save(req)
      .then(() => {
        res.status(200).json({ message: 'Datos guardados correctamente' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'No se pudieron almacenar los datos', error: err.message });
      });
  });

  app.get('/script/:id', (req, res) => {
    crud.read(req)
      .then((script) => {
        script ? 
            res.status(200).json(script) : 
            res.status(404).json({ message: 'No se encontró el script con el ID especificado' })
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error al leer el archivo JSON' });
      });
  });