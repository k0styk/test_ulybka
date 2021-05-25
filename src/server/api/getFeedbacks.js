const { getFeedbacks } = require('../controllers/feedback');

module.exports = async (req, res) => {
  const feedbacks = await getFeedbacks();

  res.status(200).json({ feedbacks });
};