/**---  CONSTANTS  ---**/
const events = require('../client/Events');
const queries = require('./db/queries');
const db = require('./db');
/**---  CONTROLLERS  ---**/
// const userController = require('./controllers/userController');
// const summaryController = require('./controllers/summaryController');
// const daySummaryController = require('./controllers/daySummaryController');
// const fileSummariesController = require('./controllers/fileSummariesController');
/**---  CONFIG  ---**/

module.exports = server => {
  const io = require('socket.io')(server, {
    transports: [ 'websocket' ]
  });

  io.on('connection', socket => {
    console.log(`user connected: ${socket.id}`);
    /**---  DISCONNECT  ---**/
    socket.on('disconnect', () => {});

    socket.on(events.constant.get_all, async (cb) => {
      const items = await db.query(queries.get_items);
      const authors = await db.query(queries.get_authors);
      const feedbackItems = await db.query(queries.get_feedback_view_all);
      
      cb({
        items: items.rows,
        authors: authors.rows,
        feedbackItems: feedbackItems.rows,
      });
    });

    socket.on(events.constant.get_items, async (cb) => {
      const { rows } = await db.query(queries.get_items);

      cb(rows);
    });

    socket.on(events.constant.get_authors, async (cb) => {
      const { rows } = await db.query(queries.get_authors);

      cb(rows);
    });

    socket.on(events.constant.get_feedback_view_all, async (cb) => {
      const { rows } = await db.query(queries.get_feedback_view_all);
      
      cb(rows);
    });

    socket.on(events.constant.get_feedback_view_item, async (itemId,cb) => {
      const { rows } = await db.query(queries.get_feedback_view_item, [itemId]);
      
      cb(rows);
    });

    socket.on(events.constant.add_feedback, async ({item, author, rating}, cb) => {
      try {
        const res = await db.query(queries.add_feedback, [item, author, rating]);
        const feedbackItems = await db.query(queries.get_feedback_view_all);
        const items = await db.query(queries.get_items);


        cb({feedbackItems: feedbackItems.rows, items: items.rows});
      } catch(err) {
        console.log(err);
        cb({err});
      }
    });

    socket.on(events.constant.add_author, async ({name,lastname,surname}, cb) => {
      try {
        const res = await db.query(queries.add_author, [name,lastname,surname]);
        const { rows } = await db.query(queries.get_authors);

        cb({authors: rows});
      } catch(err) {
        console.log(err);
        cb({err});
      }
    });

    socket.on(events.constant.add_item, async ({name}, cb) => {
      try {
        const res = await db.query(queries.add_item, [name]);
        const { rows } = await db.query(queries.get_items);

        cb({items: rows});
      } catch(err) {
        console.log(err);
        cb({err});
      }
    });
    
  });

  return io;
};