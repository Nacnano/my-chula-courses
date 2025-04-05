//  config.js
//
//  Simple application configuration. Extend as needed.
module.exports = {
	port: process.env.PORT || 80,
  db: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    database: 'ABCompany',
    user: 'users_service',
    password: '123',
    port: 3306
  }
};
