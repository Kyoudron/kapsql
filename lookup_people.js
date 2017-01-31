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


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
 const q = `
    SELECT *
    FROM famous_people
    WHERE UPPER(first_name) LIKE UPPER($1)
    OR UPPER(last_name) LIKE UPPER($1)
    LIMIT 100;
  `;

 client.query(q, [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

  born = result.rows[0].birthdate

   console.log(`${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born: ${born.toISOString().split('T')[0]}`)
  });
});
