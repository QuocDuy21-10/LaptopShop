// import data type
/// <reference path="./types/index.d.ts" /> 

import express from 'express';
import 'dotenv/config'
import passport from 'passport';
import webRoutes from 'routes/web';   
import initDatabase from 'config/seed';
import configPassportLocal from 'middlewares/passport.local';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient } from '@prisma/client';
import apiRoutes from 'routes/api';

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

//  config req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// config static files: css, js, images
app.use(express.static('public'));

// config session
app.use(session({
   cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        // clears expired sessions every 1 day
        checkPeriod: 1 * 24 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    ),
}))

// config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configPassportLocal();

// config global
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

// config routes
webRoutes(app);

// api routes
apiRoutes(app);

// fake data
initDatabase();

// handle 404 not found
app.use((req, res) => {
    res.status(404).render('status/404.ejs');
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    // console.log("env port", process.env.PORT);
    // console.log(__dirname+'/views');
})