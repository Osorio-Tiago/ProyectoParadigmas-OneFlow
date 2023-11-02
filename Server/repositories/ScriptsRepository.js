const mongoose = require('mongoose')
const Script = require('../models/Script')

const uri = 'mongodb+srv://tomoko98:Mprm0198@cluster0.rvtqkcp.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri)

async function create (script){
    const createdscript = await Script.create(script)
    return createdscript; 
}

async function findAll() {
    return Script.find({})
}

async function finById(ID){
    return Script.findById(ID)
}

module.exports = {
    create,
    findAll,
    finById
  };