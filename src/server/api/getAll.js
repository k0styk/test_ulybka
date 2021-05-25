const { getAuthors } = require('../controllers/authors');
const { getFeedbacks } = require('../controllers/feedback');
const { getItems } = require('../controllers/items');

module.exports = async (req, res) => {
  const items = await getItems();
  const authors = await getAuthors();
  const feedbacks = await getFeedbacks();
  
  res.status(200).json({
    items,
    authors,
    feedbacks,
  });
};