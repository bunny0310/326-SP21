const {Client, Pool} = require("pg");

// postgres connection configuration
console.log(process.env);
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const postgresCon = () => {
    return pool;
  };

  module.exports = {postgresCon};