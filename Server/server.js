
const express = require('express')
const bdCrud = require('./crud/bd-crud.js')
const PrologRequests = require('./PrologConn/ProlgRequests.js');

const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const ScriptRepository = require('../Server/repositories/ScriptsRepository')
const http = require('http');


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
  bdCrud.readKeywords()
    .then((keywordsJson) => {
      console.log(keywordsJson)
      res.json(keywordsJson.map(e => e.name ))
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al leer las palabras clave' });
    });
    return;
});

// GET METHOD RETURN ABOUT US INFO
app.get('/about', (req, res) => {
  bdCrud.readAboutUs().then((aboutUs) =>
  res.json(aboutUs)).catch((err) => console.log(err))
})


//  POST METHOD RETURN SAME TEXT WITH TIMESTAMP ON THE BEGINNING

/*
THIS POST IS USED ONLY IN OFS 1.5 OR BELOW
app.post('/compile', (req, res) =>{
    const timestampedText = `${new Date().toISOString()}: ${req.body.text}`; // Add timestamp to received text
    res.json({result : timestampedText}) // Returns json with timestamp + received text
    return;
})
*/


//  POST METHOD WE DON'T KNOW WHAT THIS HAVE TO DO 
app.post('/eval', ({ body: { text } }, res) =>{
  try{ 
    let evalResult = eval(text)
      console.log(evalResult)
      res.status(200).json({message: evalResult})
    }catch(err){
        res.status(500).json({ message: 'No fue posible realizar la evaluacion.' });
    }
})
// LOAD AND SAVE SCRIPTS

  app.post('/script/save', (req, res) => {
    bdCrud.save({id, contenido} = req.body)
      .then(() => {
        res.status(200).json({ message: 'Datos guardados correctamente' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'No se pudieron almacenar los datos', error: err.message });
      });
  });

  app.get('/script/:id', (req, res) => {
    bdCrud.read({id} = req.params)
      .then((script) => {
        console.log('Este es el ID '+id);
        
        script ? 
            res.status(200).json(script) : 
            res.status(404).json({ message: 'No se encontró el script con el ID especificado' })
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error al leer el archivo JSON' });
      });
      
  });



  app.get('/scripts', (req, res) => {
    ScriptRepository.findAll()
      .then(scripts => {
        res.json(scripts);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error interno del servidor');
      });
  });
  
//Es de prueba
  app.post('/testScripts', async (req, res) =>{
     try { 
         const script = await ScriptRepository.create(req.body)
         res.json(script).send('script creado');
     }
     catch(error){
       res.sendStatus(500)
     }
     return 

  });

  app.get('/testScripts/:id', async (req, res)=> {

    try {
      const found = await ScriptRepository.finById(req.params.id)
      found==null ? res.sendStatus(204) : res.json(found).send();
   }
   catch(error){
     res.sendStatus(500)
   }
   return  
  });

  app.post('/compile', ({ body: { text } }, res) => {
    // SEND REQUEST
    PrologRequests.sendRequestToProlog({text})
      .then((prologResponse) => {
        res.json({ result: prologResponse });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error en la solicitud POST a Prolog' });
      });
  });