const queries = require('../db/queries');
const db = require('../db/');

const { getItems } = require('./items');

exports.addFeedback = async ({ item, author, rating }) => {
  await db.query(queries.add_feedback, [item, author, rating]);
  const feedbacks = await this.getFeedbacks();
  const items = await getItems();

  return {
    feedbacks,
    items
  }
};

exports.getFeedbacks = async () => {
  const { rows } = await db.query(queries.get_feedback_view_all);

  return rows;
};