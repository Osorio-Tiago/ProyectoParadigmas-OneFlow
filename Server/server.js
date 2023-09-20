const express = require('express')
const app = express()
const port = 3001

const server = app.listen(port, () => console.log('Server working on port ' + port))

app.get("/api", (req, res) => {
    res.json({ "users" : ["Santiago", "Dylan", "Jose", "Paula" ]})
})
