var Role = require.main.require('./app/models/role');

exports.addRoleFunction = function(req, res) {
    
    Role.findById(req.params.role_id, function(err, role) {
        if (err) {
            res.send(err);
        }
        
        role.functions.push(req.body);
        
        role.save(function(err, role) {
            if (err) {
                res.send(err);
            }

            res.json(role);
        });
    });
};

exports.findAllRoleFunctions = function(req, res) {
    
    Role.findById(req.params.role_id, function(err, role) {
        if (err) {
            res.send(err);
        }

        res.json(role.functions);
    });
};

exports.findRoleFunctionById = function(req, res) {
    Role.findById(req.params.role_id, function(err, role) {
        if (err) {
            res.send(err);
        }
        res.json(role.functions.id(req.params.function_id));
    });
};

exports.updateRoleFunction = function(req, res) {
    
    Role.findById(req.params.role_id, function(err, role) {
        if (err) {
            res.send(err);
        }
        
        var func = role.functions.id(req.params.function_id);
        func.name = req.body.name;
        
        role.save(function(err, role) {
            if (err) {
                res.send(err);
            }

            res.json(role);
        });
    });
};

exports.deleteRoleFunction = function(req, res) {
    
    Role.findById(req.params.role_id, function(err, role) {
        if (err) {
            res.send(err);
        }
        
        var func = role.functions.id(req.params.function_id).remove();

        role.save(function(err, role) {
            if (err) {
                res.send(err);
            }

            res.json(role);
        });
    });
};