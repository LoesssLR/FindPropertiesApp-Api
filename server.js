var express = require('express');
    app = express();
    port =  process.env.PORT || 3000,
    bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    var routes = require('./routes/findpropertiesRoutes');
    routes(app);

    app.listen(port);

console.log('Server started on: ' + port);