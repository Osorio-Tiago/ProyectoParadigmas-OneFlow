
const express = require('express')
const crud = require('./crud/fs-crud.js')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const ScriptRepository = require('../Server/repositories/ScriptsRepository')

const app = express()

const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log('Server working on port ' + port))

app.use(bodyParser.json());
app.use(cors())


// serve up production assets
app.use(express.static('../client/build'));

// serve up the index.html if express does'nt recognize the route
app.get('/', (req, res) => {
res.sendFile(path.resolve(__dirname, '..','client', 'build', 'index.html'));
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
app.get('/about', (req, res) => {
  crud.readAboutUs().then((aboutUs) =>
  res.json(aboutUs)).catch((err) => console.log(err))
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
    crud.save({id, texto} = req.body)
      .then(() => {
        res.status(200).json({ message: 'Datos guardados correctamente' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'No se pudieron almacenar los datos', error: err.message });
      });
  });

  app.get('/script/:id', (req, res) => {
    crud.read({id} = req.params)
      .then((script) => {
        script ? 
            res.status(200).json(script) : 
            res.status(404).json({ message: 'No se encontró el script con el ID especificado' })
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error al leer el archivo JSON' });
      });
  });


  app.get('/scripts', async (req, res)=>{
    const scripts = await ScriptRepository.findAll()
    res.json(scripts).send();
    return 

  });

  app.post('/testScripts', async (req, res) =>{
     try { 
         const script = await ScriptRepository.create(req.body)
         res.sendStatus(200) 
     }
     catch(error){
       res.sendStatus(500)
     }
     return 

  });