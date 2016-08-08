var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    
    name: String, 
    description: String,
    image: String,
    price: Number,
    address: String,
    contact: [String],
    location: [String],
    category : [String], //need to be a String ???
    shop: String,
    createDate: { type: Date},
    productList: { type: String, ref: 'ProductList' },
    updated: { type: Date, default: Date.now }                          
});

module.exports = mongoose.model('Product', ProductSchema, 'product');