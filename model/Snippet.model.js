const fs = require('fs').promises;
const path = require('path');
/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @param
 */
// alt shift a for block comment
/* Create */
/* Read */
/**
 {
     author: 'Scott,
     language: 'javascript'
 }
 */
/**
 * Select snippets from database
 * Can accept optional query objet to filter results.
 * @param {Object} [query]
 * @returns {Promise<Object[]>}
 */
exports.select = async (query = {}) => {
  try {
    // 1.read the file
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));

    // console.log(__dirname);
    // 2. Parse data
    // const parsedSnippets = JSON.parse(snippets);
    // filter snippets with query
    // check if every query keys
    // see if snippet[key] = query[key];
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. return the data
    return filtered;
  } catch (err) {
    console.log('Error in Snippet model');
    throw err;
  }
};
/* Update */
/* Delete */
