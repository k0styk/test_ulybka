const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bring in the routes
// statics
app.use('/', express.static(path.join(__dirname, '../../dist')));
// routes
app.use(require('./routes/download'));

module.exports = app;