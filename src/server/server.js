/*

add rating for item
ratings for items from view
items

*/
/* eslint-disable */

const PORT =      process.env.PORT,
      HOST =      process.env.HOST;

(async () => {
  async function listenCallback() {
    try {
      // some functions after server start
    } catch (err) {
      console.log('Some error occured');
      console.log(err);
    }
    finally {
      console.log(`Server started at: http://${HOST}:${PORT}`);
    }
  }

  const server = require('./app').listen(PORT,HOST,listenCallback);
  const io = require('./socket')(server);
})();
/* eslint-enable */