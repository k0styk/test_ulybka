const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const {
  developmentErrors,
  productionErrors,
  notFound
} = require('./handlers/errorHandler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bring in the routes
// statics
app.use('/', express.static(path.join(__dirname, '../../dist')));
app.use(require('./routes/'));

// bring error handler
app.use(notFound);
if (process.env.NODE_ENV === 'dev') {
  app.use(developmentErrors);
} else {
  app.use(productionErrors);
}

module.exports = app;