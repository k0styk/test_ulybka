const { getItems } = require('../controllers/items');

module.exports = async (req, res) => {
  const items = await getItems();

  res.status(200).json({ items });
};