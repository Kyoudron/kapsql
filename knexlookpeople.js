const knex = require('knex')({
  client: 'pg',
  connection: {
    user: "uzwpoiyxwqnsuw",
    password: "a2fcfba3ddd4397fc9feff24cb583d2b1af86db434caa885e690b0b290605331",
    database: "d84occivr3ih92",
    hostname: "ec2-54-225-67-3.compute-1.amazonaws.com",
    port: 5432,
    ssl: true
  }
});

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
  process.exit();
});

