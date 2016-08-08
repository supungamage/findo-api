var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleFunctionSchema = new Schema({
    funcname: String
});

module.exports = mongoose.model('RoleFunction', RoleFunctionSchema, 'roleFunction');