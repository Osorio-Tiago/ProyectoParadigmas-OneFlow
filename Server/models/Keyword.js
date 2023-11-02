
const moongose = require('mongoose')

const Schema = moongose.Schema()

const keywordSchema = new moongose.Schema({
    name: String
  });
  
  const Keyword = moongose.model('Keyword', keywordSchema);
  
  module.exports = Keyword