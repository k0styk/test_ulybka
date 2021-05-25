const { getAuthors } = require('../controllers/authors');

module.exports = async (req, res) => {
  const authors = await getAuthors();

  res.status(200).json({ authors });
};