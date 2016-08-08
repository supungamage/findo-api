var mongoose = require('mongoose');
var Promise = require('bluebird');
var Profile = require.main.require('./app/models/profile');
var Role = require.main.require('./app/models/role');
var roleService     = require('./roleService');

exports.addProfile = function(req, res) {
    
    if(req.body.role != null) {
        var profile = new Profile(req.body);
        roleService.findRoleByName(req.body.role, function(newRole) {
            profile.role = newRole;
            saveProfile(profile, res);
        });
    } else {
        var profile = new Profile(req.body);
        saveProfile(profile, res);
    }
};

var saveProfile = function(profile, res) { 
    profile.save(function(err, profile) {
        if (err) {
            res.send(err);
        }

        res.json(profile);
    });
}


exports.findAllProfiles = function(req, res) {
    
    Profile.find().populate('role').exec(function(err, profiles) {
        if (err) {
            res.send(err);
        }

        res.json(profiles);
    });
};

exports.findProfileById = function(req, res) {
    Profile.findOne({'_id' : req.params.profile_id}).populate('role').exec(function(err, profile) {
        if (err) {
            res.send(err);
        }
        
        res.json(profile);
    });
};


exports.updateProfile = function(req, res) {
    
    Profile.findById(req.params.profile_id, function(err, profile) {

        if (err) {
            res.send(err);
        }
        
        populateProfile(req.body, profile, res);
    });

};

exports.deleteProfile = function(req, res) {
    
    Profile.remove({_id: req.params.profile_id}, function(err, profile) {
        if (err) {
            res.send(err);
        }

        res.json('profile deleted');
    });
}; 

var populateProfile = function(body, profile, res) {
    
    if(body.name != null) {
        profile.name = body.name;
    }
    if(body.fname != null) {
         profile.fname = body.fname;
    }
    if(body.lname != null) {
         profile.lname = body.lname;
    }
    if(body.email != null) {
         profile.email = body.email;
    }
    if(body.contact != null) {
         profile.contact = body.contact;
    }
    if(body.role != null && body.role !== profile.role.name) {
        roleService.findRoleByName(body.role, function(newRole) {
            profile.role = newRole;
            saveProfile(profile, res);
        });
    } else {
        saveProfile(profile, res);
    }
};