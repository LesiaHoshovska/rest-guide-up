module.exports = {
  secretKey: process.env.SECRET_KEY || 'AnotherBreakInTheWall',
  expiresIn: process.env.EXPIRES_IN || '1h',
  port: process.env.PORT || '3000',
  host: process.env.HOST || 'localhost',
  db_port: process.env.DB_PORT || '27017',
  db_name: process.env.DB || 'user_db',
};
