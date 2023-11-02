const moongose = require('mongoose')

const Schema = moongose.Schema()

const ScriptSchema = new moongose.Schema({
    id: String, 
    contenido: String
  });
  
const Script = moongose.model('Script',ScriptSchema)


module.exports = Script
