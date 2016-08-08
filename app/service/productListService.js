var mongoose = require('mongoose');
var ProductList = require.main.require('./app/models/productList');
var Profile = require.main.require('./app/models/profile');

exports.addProductList = function(req, res) {
    if(req.body.profile == null) {
        res.json("Login required");
    } else {
        var productList = new ProductList(req.body);
        productList.createDate = Date.now();
        saveProductList(productList, res);
    }
};

var saveProductList = function(productList, res) { 
    productList.save(function(err, productList) {
        if (err) {
            res.send(err);
        }

        res.json(productList);
    });
}


exports.findAllProductLists = function(req, res) {
    
    ProductList.find().populate('profile').exec(function(err, productLists) {
        if (err) {
            res.send(err);
        }

        res.json(productLists);
    });
};

exports.findProductListById = function(req, res) {
    ProductList.findOne({'_id' : req.params.productList_id}).populate('profile').exec(function(err, productList) {
        if (err) {
            res.send(err);
        }
        
        res.json(productList);
    });
};


exports.updateProductList = function(req, res) {
    
    ProductList.findById(req.params.productList_id, function(err, productList) {

        if (err) {
            res.send(err);
        }
        
        populateProductList(req.body, productList, res, function(productList, res) {
            saveProductList(productList, res);
        });
    });

};

exports.deleteProductList = function(req, res) {
    
    ProductList.remove({_id: req.params.productList_id}, function(err, productList) {
        if (err) {
            res.send(err);
        }

        res.json('productList deleted');
    });
}; 

var populateProductList = function(body, productList, res, callback) {

    if(body.name != null) {
        productList.name = body.name;
    }
    if(body.description != null) {
         productList.description = body.description;
    }
    if(body.address != null) {
         productList.address = body.address;
    }
    if(body.email != null) {
         productList.email = body.email;
    }
    if(body.contact != null) {
         productList.contact = body.contact;
    }
    
    callback(productList, res);
    
};