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
    // Don't know what to do here... yet
})


// LOAD AND SAVE SCRIPTS

app.post('/script/save', (req, res) => {
    try{
        crud.save(req)
    }catch(err){
        res.status(500).json({ message: 'No se pudieron almacenar los datos' });
    }
    res.status(200).json({ message: 'Datos guardados correctamente' });
  });

app.get('/script/:id', (req, res) => {
    try {
        var script = crud.read(req)
        console.log(script)
        if (script) {
            res.status(200).json(script);
          } else {
            res.status(404).json({ message: 'No se encontró el script con el ID especificado' });
          }
    } catch (err) {

        res.status(500).json({ message: 'Error al leer el archivo JSON' });
    }
})