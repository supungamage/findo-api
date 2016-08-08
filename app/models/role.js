var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleFunctionSchema = new Schema({
    name: String
});

var RoleSchema = new Schema({
    name: String, 
    functions : [RoleFunctionSchema]
});

module.exports = mongoose.model('Role', RoleSchema, 'role');