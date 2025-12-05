'use strict';

module.exports = function(app) {
    const user = require('../controllers/UserController');
    const properties = require('../controllers/PropertyController');
    const authRequired = require('../util/authMiddleware');

    // Auth Routes
    app.route('/auth/signup')
        .post(user.signup);

    app.route('/auth/login')
        .post(user.login);

    // User Routes
    app.route('/users/getAllUsers')
        .get(user.listAllUsers);

    app.route('/users/:userId')
        .get(user.getUserById)
        .put(user.updateUserById)
        .delete(user.deleteUserById);

    // Property Routes
    app.route('/properties/getAllProperties')
        .get(properties.listAllProperties)

    app.route('/properties/addProperty')
        .post(authRequired, properties.createProperty); 

    app.route('/properties/:propertyId')
        .get(properties.getPropertyById)
        .put(authRequired, properties.updatePropertyById)   
        .delete(authRequired, properties.deletePropertyById);
};
