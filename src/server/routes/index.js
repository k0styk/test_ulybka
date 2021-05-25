const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const {
  addAuthor,
  addFeedback,
  addItem,
  getAll,
  getAuthors,
  getFeedbacks,
  getItems,
  routes
} = require('../api/');

router.get(routes.all, catchErrors(getAll));
router.get(routes.getItems, catchErrors(getItems));
router.get(routes.getAuthors, catchErrors(getAuthors));
router.get(routes.getFeedbacks, catchErrors(getFeedbacks));
router.post(routes.addItem, catchErrors(addItem));
router.post(routes.addAuthor, catchErrors(addAuthor));
router.post(routes.addFeedback, catchErrors(addFeedback));

module.exports = router;