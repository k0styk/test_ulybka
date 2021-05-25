const { addAuthor } = require('../controllers/authors');

module.exports = async (req, res) => {
  const authors = await addAuthor(req.body);

  res.status(200).json({authors});
};