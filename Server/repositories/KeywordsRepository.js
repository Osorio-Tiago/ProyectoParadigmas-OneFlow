
const mongoose = require('mongoose')

const Keyword = require('../models/Keyword')

const uri = 'mongodb+srv://tomoko98:Mprm0198@cluster0.rvtqkcp.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri)

async function findAll() {
    return Keyword.find()
}

module.exports = {
    findAll 
  };