
// Followed: https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/

const passport = require('passport');
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');






module.exports = (app, uri, options, User) => {

    const store = new SessionStore({
        uri,
        databaseName: options.dbName,
        collection: 'sessions'
    });

    
    app.use(cookieParser());
    app.use(session({
        secret: 'super-secret-cookie',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
        store: store,
        resave: false,
        saveUninitialized: false
    }));

    passport.use(User.createStrategy());

    // To use with sessions
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(passport.initialize());
    app.use(passport.session());



    app.post('/session/login', passport.authenticate('local'), (req, res) => res.status(201).send())
    app.post('/session/logout', (req, res) => {
        req.logout(() => res.status(200).send());
    })
    
    
} 