// const express = require('express');
import express from 'express';
import 'dotenv/config'
import { log } from 'console';

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

app.get('/', (req, res)=> {
    res.render('home');
})
app.get('/abc', (req,res)=> {
    res.send('<h1 style="color:red">abc</h1>');
})
app.get('/api', (req, res)=> {
    res.json({message: 'Hello Duy'});
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    console.log("env port", process.env.PORT);
    console.log(__dirname+'/views');
})