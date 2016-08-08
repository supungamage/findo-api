var Category = require.main.require('./app/models/category');

exports.addCategory = function(req, res) {
    
    var category = new Category(req.body);

    category.save(function(err, category) {
        if (err) {
            res.send(err);
        }

        res.json(category);
    });
};

exports.findAllCategories = function(req, res) {
    
    Category.find(function(err, categories) {
        if (err) {
            res.send(err);
        }

        res.json(categories);
    });
};

exports.findCategoryById = function(req, res) {
    Category.findById(req.params.category_id, function(err, category) {
        if (err) {
            res.send(err);
        }
        
        res.json(category);
    });
};

exports.updateCategory = function(req, res) {
    
    Category.findById(req.params.category_id, function(err, category) {

        if (err) {
            res.send(err);
        }

        category.name = req.body.name;

        category.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json(category);
        });
    });
};

exports.deleteCategory = function(req, res) {
    
    Category.remove({_id: req.params.category_id}, function(err, category) {
        if (err) {
            res.send(err);
        }

        res.json('category deleted');
    });
};