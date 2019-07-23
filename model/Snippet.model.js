const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */
// alt shift a for block comment
/* Create */
/**
 * Inserts a new snippet into the db.
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    // check if the parameter is provided
    if (!author || !code || !title || !description || !language)
      throw Error('Missing properties');
    {
      // read snippets.json
      // 1.read the file
      const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
      const snippets = JSON.parse(await fs.readFile(dbpath));
      // grab data from the newSnippet(validate)
      // make newSnippet a proper object
      // generate default data(id,comments,favorites)
      // instead of author:author, push is the same.
      // push that object into snippets
      snippets.push({
        id: shortid.generate(),
        author,
        code,
        title,
        description,
        language,
        comments: [],
        favorites: 0,
      });
      await fs.writeFile(dbpath, JSON.stringify(snippets));
      return snippets[snippets.length - 1];
      // write to the file
      // return fs.writeFile(dbpath, JSON.stringify(snippets));
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
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
 * @returns {Snippet<Object[]>}
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
