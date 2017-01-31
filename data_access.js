const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const queryDB = (q, params, cb) => {
  client.connect((err) =>{
    if (err) {
      return console.error("error", err);
    }
    client.query(q, params, cb)
  })
};

module.exports = {
  query: queryDB
};
