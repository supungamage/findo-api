var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var categoryService = require('./app/service/categoryService');
var roleFunctionService = require('./app/service/roleFunctionService');
var roleService     = require('./app/service/roleService');
var profileService     = require('./app/service/profileService');
var productListService     = require('./app/service/productListService');
var productService = require('./app/service/productService');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/findo'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('A request came!');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Findo API, Testing success!' });   
});

// all of our routes will be prefixed with /api
app.use('/api', router);

router.route('/categories').post(categoryService.addCategory)
    .get(categoryService.findAllCategories);
router.route('/categories/:category_id').get(categoryService.findCategoryById)
    .put(categoryService.updateCategory)
    .delete(categoryService.deleteCategory);

router.route('/roles').post(roleService.addRole)
    .get(roleService.findAllRoles);
router.route('/roles/:role_id').get(roleService.findRoleById)
    .put(roleService.updateRole)
    .delete(roleService.deleteRole);

router.route('/roles/:role_id/functions').post(roleFunctionService.addRoleFunction)
    .get(roleFunctionService.findAllRoleFunctions);
router.route('/roles/:role_id/functions/:function_id').get(roleFunctionService.findRoleFunctionById)
    .put(roleFunctionService.updateRoleFunction)
    .delete(roleFunctionService.deleteRoleFunction);

router.route('/profiles').post(profileService.addProfile)
    .get(profileService.findAllProfiles);
router.route('/profiles/:profile_id').get(profileService.findProfileById)
    .put(profileService.updateProfile)
    .delete(profileService.deleteProfile); 

router.route('/productList').post(productListService.addProductList)
    .get(productListService.findAllProductLists);
router.route('/productList/:productList_id').get(productListService.findProductListById)
    .put(productListService.updateProductList)
    .delete(productListService.deleteProductList); 

router.route('/product').post(productService.addProduct)
    .get(productService.findAllProducts);
router.route('/product/:product_id').get(productService.findProductById)
    .put(productService.updateProduct)
    .delete(productService.deleteProduct); 

router.route('/search').get(productService.simpleSearch);
router.route('/advanceSearch').get(productService.advanceSearch);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);