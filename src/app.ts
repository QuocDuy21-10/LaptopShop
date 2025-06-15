// const express = require('express');
import express from 'express';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 8080;
import webRoutes from './routes/web';   

//config view engine
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

//  config req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// config static files: css, js, images
app.use(express.static('public'));

// config routes
webRoutes(app);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    console.log("env port", process.env.PORT);
    console.log(__dirname+'/views');
})