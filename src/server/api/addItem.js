const { addItem } = require('../controllers/items');

module.exports = async (req, res) => {
  const items = await addItem(req.body);

  res.status(200).json({items});
};