const queries = require('../db/queries');
const db = require('../db/');

exports.addAuthor = async ({ name, lastname, surname }) => {
  await db.query(queries.add_author, [name, lastname, surname]);

  return this.getAuthors();
};

exports.getAuthors = async () => {
  const { rows } = await db.query(queries.get_authors);

  return rows;
};