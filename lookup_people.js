const pg = require('pg');
const settings = require('./settings');
const data = require('./data_access')

 const q = `
    SELECT *
    FROM famous_people
    WHERE UPPER(first_name) LIKE UPPER($1)
    OR UPPER(last_name) LIKE UPPER($1)
    LIMIT 100;
  `;

 data.query(q, [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

  born = result.rows[0].birthdate

   console.log(`- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${born.toISOString().split('T')[0]}'`)
  });

