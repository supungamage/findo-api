var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductListSchema = new Schema({
    name: String, 
    description: String,
    address: String,
    email: String,
    contact: [String],
    createDate: { type: Date},
    profile: {
        type: String,
        ref: 'Profile'
    },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductList', ProductListSchema, 'productList');