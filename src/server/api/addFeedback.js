const { addFeedback } = require('../controllers/feedback');

module.exports = async (req, res) => {
  const result = await addFeedback(req.body);

  res.status(200).json(result);
};