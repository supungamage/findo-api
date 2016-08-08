var Promise = require('bluebird');

var populateProfilePromise = Promise.promisify(function(aa) {

    for(var a=0; a<=aa; a++) {
        console.log("populateProfilePromise middle " + a);
    }
});

var updateProfile = function() {
    var aa = 100;
    console.log("updateProfile Start........");
    populateProfilePromise(aa).then(saveProfile(aa));
};

var saveProfile = function(aa) {
    console.log("saveProfile end " + aa);
};

updateProfile();