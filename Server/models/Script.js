const moongose = require('mongoose')

const Schema = moongose.Schema()


const ScriptSchema = new moongose.Schema({
    fecha: { type: Date, default: Date.now },
    contenido: String
});


const Script = moongose.model('Script',ScriptSchema)

module.exports = Script