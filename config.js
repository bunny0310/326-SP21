const {Client, Pool} = require("pg");

// postgres connection configuration
const pool = new Pool({
    user: 'odigrmbnsfpaah',
    host: 'ec2-54-224-120-186.compute-1.amazonaws.com',
    database: 'd3k01qf3m3malv',
    password: '2a79befeeed8d47b88dcc4b33565660bdf5dcdcd6db6812410947666afbdfaa5',
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const postgresCon = () => {
    return pool;
  };

  module.exports = {postgresCon};