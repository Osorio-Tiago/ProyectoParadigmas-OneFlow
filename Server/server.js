const express = require('express')
const app = express()
const port = 3001

const server = app.listen(port, () => console.log('Server working on port ' + port))

app.get("/api", (req, res) => {
    res.json({ "users" : ["Santiago", "Dylan", "Jose", "Paula" ]})
})


//  POST METHOD RETURN SAME TEXT WITH TIMESTAMP ON THE BEGINNING
app.post('/compile', (req, res) =>{
    const timestampedText = `${new Date().toISOString()}: ${req.body.text}`; // Add timestamp to received text
    res.json({result : timestampedText}) // Returns json with timestamp + received text
})

//  POST METHOD
app.post('/eval', (req, res) =>{
    // Don't know what to do here... yet
})


// GET AND SAVE SCRIPTS

app.get('/script/:id', (req, res) => {

})