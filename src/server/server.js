/* eslint-disable */
require('dotenv').config();

const PORT = process.env['APP_PORT'],
      HOST = process.env['APP_HOST'];

(async () => {
  async function listenCallback() {
    try {
      // some functions after server start
      // you can also use async/await      
    } catch (err) {
      console.log('Some error occured');
      console.log(err);
    }
    finally {
      console.log(`Server started at: http://${HOST}:${PORT}`);
    }
  }

  const server = require('./app').listen(PORT,HOST,listenCallback);
})();
/* eslint-enable */