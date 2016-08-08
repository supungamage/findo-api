var mongoose = require('mongoose');
var Product = require.main.require('./app/models/product');
var ProductList = require.main.require('./app/models/productList');

exports.addProduct = function(req, res) {
    if(req.body.productList == null) {
        res.json("productList required");
    } else {
        var product = new Product(req.body);
        product.createDate = Date.now();
        saveProduct(product, res);
    }
};

var saveProduct = function(product, res) { 
    product.save(function(err, product) {
        if (err) {
            res.send(err);
        }

        res.json(product);
    });
}


exports.findAllProducts = function(req, res) {
    
    Product.find().exec(function(err, products) {
        if (err) {
            res.send(err);
        }

        res.json(products);
    });
};

exports.simpleSearch = function(req, res) {

    if(req.query.prm == null) {
        res.json("Open search disabled!")
    }

    Product.find({ $text: { $search: req.query.prm } }, function(err, products) {
        if (err) {
            res.send(err);
        }

        res.json(products);

    });

};

exports.advanceSearch = function(req, res) {

    var searchObject = null;
    
    if(req.query.name != null) {
        searchObject.name = req.query.name;
    }
    /*if(req.query.minprice != null || req.query.maxprice != null) { 
        if(req.query.minprice != null) {
            var priceObject = null;
            if(req.query.minprice != null) {
                priceObject.'$gt' = req.query.minprice;
            }
            if(req.query.maxprice != null) {
                priceObject.'$lt' = req.query.maxprice;
            }
            searchObject.price = priceObject;
        }
        
    }*/
    if(req.query.category != null) {
        var categoris = req.query.category.split(',');
        searchObject.category = categoris;
    }

    Product.find(searchObject).exec(function(err, products) {
        if (err) {
            res.send(err);
        }

        res.json(products);

    });

};


exports.findProductById = function(req, res) {
    Product.findOne({'_id' : req.params.product_id})
        .populate('productList')
        .exec(function(err, product) {
        
        if (err) {
            res.send(err);
        }
        
        res.json(product);
    });
};


exports.updateProduct = function(req, res) {
    
    Product.findById(req.params.product_id, function(err, product) {

        if (err) {
            res.send(err);
        }
        
        populateProduct(req.body, product, res, function(product, res) {
            saveProduct(product, res);
        });
    });

};

exports.deleteProduct = function(req, res) {
    
    Product.remove({_id: req.params.product_id}, function(err, product) {
        if (err) {
            res.send(err);
        }

        res.json('product deleted');
    });
}; 

var populateProduct = function(body, product, res, callback) {

    if(body.name != null) {
        product.name = body.name;
    }
    if(body.description != null) {
         product.description = body.description;
    }
    if(body.image != null) {
         product.image = body.image;
    }
    if(body.price != null) {
         product.price = body.price;
    }
    if(body.address != null) {
         product.address = body.address;
    }
    if(body.contact != null) {
         product.contact = body.contact;
    }
    if(body.location != null) {
         product.location = body.location;
    }
    if(body.category != null) {
         product.category = body.category;
    }
    if(body.productList != null) {
         product.productList = body.productListID;
    }
    if(body.shop != null) {
         product.shop = body.shop;
    }

    callback(product, res); 
};