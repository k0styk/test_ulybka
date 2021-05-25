const queries = require('../db/queries');
const db = require('../db/');

exports.addItem = async ({ name }) => {
  await db.query(queries.add_item, [name]);

  return this.getItems();
};

exports.getItems = async () => {
  const { rows } = await db.query(queries.get_items);

  return rows;
};