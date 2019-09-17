// const shortid = require('shortid');
const format = require('pg-format');
const db = require('../db');
// const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

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

exports.insert = async ({ id, code, title, description, author, language }) => {
  if (!id || !author || !code || !title || !description || !language)
    throw new ErrorWithHttpStatus('Missing properties', 400);
  return db.query(
    `INSERT INTO snippet (id, code, title, description, author, language) VALUES ($1, $2, $3, $4, $5)`,
    [id, code, title, description, author, language]
  );

  // check if some number of rows were deleted

  // // check if the parameter is provided
  // if (!author || !code || !title || !description || !language)
  //   /* When the client messes up, you throw 400 error */
  //   throw ErrorWithHttpStatus('Missing properties', 400);
  // {
  //   // read snippets.json
  //   // 1.read the file
  //   const snippets = await readJsonFromDb('snippets');
  //   // grab data from the newSnippet(validate)
  //   // make newSnippet a proper object
  //   // generate default data(id,comments,favorites)
  //   // instead of author:author, push is the same.
  //   // push that object into snippets
  //   snippets.push({
  //     id: shortid.generate(),
  //     author,
  //     code,
  //     title,
  //     description,
  //     language,
  //     comments: [],
  //     favorites: 0,
  //   });
  //   await writeJsonToDb('snippets', snippets);
  //   return snippets[snippets.length - 1];
  //   // write to the file'
  //   // return fs.writeFile(dbpath, JSON.stringify(snippets));
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
exports.select = async query => {
  try {
    const clauses = Object.keys(query)
      .map((key, i) => `%I = $${i + 1}`)
      .join(' AND ');
    const formattedSelect = format(
      `SELECT * FROM snippet ${clauses.length ? `WHERE ${clauses}` : ''}`,
      ...Object.keys(query)
    );
    const results = await db.query(formattedSelect, Object.values(query));
    // console.log(results.rows);
    return results.rows;

    // const whereClause = `WHERE ${Object.keys(query)
    //   .map((_, i) => `%I = $${i + 1}`)
    //   .join(' AND ')};`;
    // const sql = format(
    //   `SELECT * FROM snippet ${query ? whereClause : ''} ORDER BY id`,
    //   Object.keys(query)
    // );

    // const result = await db.query('SELECT * FROM snippet');
    // return result.rows;
    /* OLD file-based method
    // 1.read the file
    const snippets = await readJsonFromDb('snippets');
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
    */
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error', 500);
  }
};
/**
 * Updates a snippet
 * @param {string} id - id of the snippet to update
 * @param {Snippet} newData - subset of values to update
 *
 */
exports.update = async (id, newData = {}) => {
  try {
    const { id, author, code, title, description, language } = newData;
    await db.query(
      `UPDATE snippets 
      SET 
        id = COALESCE($1, id),
        author = COALESCE($2, author),
        code = COALESCE($3, code),
        title = COALESCE($4, title),
        description = COALESCE($5, description),
        language=COALESCE($6, language)
      WHERE id = ($1)`,
      [id, author, code, title, description, language]
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
// check if some number of rows were deleted
/*
  // TODO: error on ID not found
  // 1. read the file
  const snippets = await readJsonFromDb('snippets');
  // 2. find the snippet entry with id
  // 3. update the snippet with appropriate data(make sure to validate!)
  const updatedSnippets = snippets.map(snippet => {
    // if its not the one we want just return it
    // try {

    if (snippet.id !== id) return snippet;
    // turns the object into array
    // loop over keys in new Data
    Object.keys(newData).forEach(key => {
      // if the key already exist on
      if (key in snippet) snippet[key] = newData[key];
    });

    // } //catch (err) {} // TODO: 400 error on key DNE
    // turns keys into array
    return snippet;
  });
  // 4. Write back to db.
  return writeJsonToDb('snippets', updatedSnippets);
  */

/**
 * Deletes a snippet
 * @param {string} id
 */
exports.delete = async id => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    // check if some number of rows were deleted
    if (result.rowsCount === 0)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404);

    // old file-based method
    // // 1.read the file
    // const snippets = await readJsonFromDb('snippets');
    // // 2. Filter snippets for everything except snippet.id === id;
    // // see if snippet[key] = query[key];
    // const filtered = snippets.filter(snippet => snippet.id !== id);
    // // if the snippets is the same amount as before
    // if (filtered.length === snippets.length) return;
    // // write file
    // return writeJsonToDb('snippets', filtered);
  } catch (err) {
    // TODO: error if trying to delete a snippet DNE
    throw err;
  }
};

// 3. write the file
// };
