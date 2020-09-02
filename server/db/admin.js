const startDB = require('./firebase');

const getAdminDB = fn => (...args) => fn([...args, startDB.db]);

module.exports = {
  getAdminDB,
};
