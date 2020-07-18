const mongoose = require('mongoose')
const Schema = mongoose.Schema ;

const products = Schema({
    title : String ,
    price: Number ,
    ImageUrl: String
});

module.exports = mongoose.model( 'products' , products )