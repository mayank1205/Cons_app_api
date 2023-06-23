const kenx = require("knex");

module.exports = kenx({
  client: "pg",  // postgres
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "construction-app"
  }
});