const fs = require('fs').promises;
const path = require('path');

// file for database utilities
/**
 * Gets absolute path to `resource` db file
 * @param {string} resource
 */

/**
 * Reads and parses JSON data from DB
 * @param {string} resource - resource to fetch
 * @returns {Promise<Object>} parsed data
 */
exports.readJsonFromDb = async resource => {
  // 1.read the file
  const dbpath = path.join(__dirname, '..', 'db', `${resource}.json`);
  return JSON.parse(await fs.readFile(dbpath));
};
/**
 * Writes JSON data to DB file
 * @param {string} resource - resource to write to
 * @param {Object} data - data ro write
 * @returns {Promise<void>}
 */
exports.writeJsonToDb = (resource, data) => {
  // 1.read the file
  const dbpath = path.join(__dirname, '..', 'db', `${resource}.json`);
  // 2. write the file
  fs.writeFile(dbpath, JSON.stringify(data));
};
