const getAll = require('./getAll');
const getItems = require('./getItems');
const getAuthors = require('./getAuthors');
const getFeedbacks = require('./getFeedbacks');
const addFeedback = require('./addFeedback');
const addAuthor = require('./addAuthor');
const addItem = require('./addItem');
const { routes } = require('../../client/constants');

module.exports = {
  getAll,
  getItems,
  getAuthors,
  getFeedbacks,
  addFeedback,
  addAuthor,
  addItem,
  routes,
};