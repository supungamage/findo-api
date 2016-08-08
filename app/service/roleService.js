var Role = require.main.require('./app/models/role');

exports.addRole = function(req, res) {
    
    var role = new Role(req.body);

    role.save(function(err, role) {
        if (err) {
            res.send(err);
        }

        res.json(role);
    });
    
};

exports.findAllRoles = function(req, res) {
    
    Role.find(function(err, roles) {
        if (err) {
            res.send(err);
        }

        res.json(roles);
    });
};

exports.findRoleById = function(req, res) {
    Role.findById(req.params.role_id, function(err, roles) {
        if (err) {
            res.send(err);
        }
        
        res.json(roles);
    });
};

exports.updateRole = function(req, res) {
    
    Role.findById(req.params.role_id, function(err, role) {

        if (err) {
            res.send(err);
        }

        role.name = req.body.name;
        if(req.body.functions != null && req.body.functions.length) {
            role.functions = req.body.functions;
        }

        role.save(function(err, role) {
            if (err) {
                res.send(err);
            }

            res.json(role);
        });
    });
};

exports.deleteRole = function(req, res) {
    
    Role.remove({_id: req.params.role_id}, function(err, role) {
        if (err) {
            res.send(err);
        }

        res.json('Role deleated');
    });
};

exports.findRoleByName = function(name, callback) {
    
    Role.findOne({name: name}, function(err,role) { 
        if (err) {
            callback(null);
        }
        callback(role);
    });
};