const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Routes which should handle requests
const userRoutes = require('./routes/user');

const db = require('./config/keys').MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true }).catch(error => console.log(error.message));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user',userRoutes);

module.exports = app;