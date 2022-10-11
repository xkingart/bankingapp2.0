const express = require('express');
const routes = require('./src/routes')
const auth = require('./src/auth')
const mongoose_factory = require('./src/entities/mongoose')

async function startup() {
    const app = express();

    app.use(express.json())
    // CORS -->
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    const MONGOOSE_URI = `mongodb://${'xking-banking-mongo'}:3002`
    const MONGO_URI = `mongodb://${'root'}:${'root'}@${'xking-banking-mongo'}:3002`
    const MONGO_OPTIONS = { 
        user: 'root',
        pass:'root',
        authSource: "admin",
        dbName: "xking-banking-db" 
    }

    //Setup mongoose
    const mongoose = await mongoose_factory(MONGOOSE_URI, MONGO_OPTIONS)
    //Get Models
    const User = require('./src/entities/user')(mongoose)
    const Person = require('./src/entities/person')(mongoose)
    const Account = require('./src/entities/account')(mongoose)

    const Models = { User, Person, Account }

    //Auth and Session
    auth(app, MONGO_URI, MONGO_OPTIONS, User)

    // Register routes
    routes(app, Models)


    const port = process.env.PORT || 3001;
    app.listen(port , () => console.log('XBanking API ready on port : ' + port));
}

startup()

