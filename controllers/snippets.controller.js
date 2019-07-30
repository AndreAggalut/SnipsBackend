const Snippet = require('../model/Snippet.model.js');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.createSnippet = async (request, response, next) => {
  // console.log(request.body);
  // create a snippet
  try {
    const snippet = await Snippet.insert(request.body);
    // send the information to the snippet
    response.status(201).send(snippet);
  } catch (err) {
    next(err);
  }
};

exports.getSnippet = async ({ query }, response, next) => {
  try {
    // 1. get data from snippets model
    const snippets = await Snippet.select(query);
    // 2. send that out
    response.send(snippets);
  } catch (err) {
    next(err);
    // else response.status(500.send('Server Error'))
  }
};

exports.getSnippetById = async ({ params: { id } }, response, next) => {
  // get the data: call Snippet.select passing an id (from request.params)
  try {
    // const { id } = request.params;
    const snippets = await Snippet.select({ id });
    if (snippets.length === 0) {
      throw new ErrorWithHttpStatus('ID does not exist'); // 404
    }
    // send that snippet backs
    response.send(snippets[0]);
  } catch (err) {
    next(err);
    // else response.status(500.send('Server Error'))
  }
};
/**
 * Update a snippet
 */
exports.updateSnippetById = async (
  { params: { id, newData } },
  response,
  next
) => {
  // get the data: call Snippet.select passing an id (from request.params)
  try {
    const snippets = await Snippet.update({ id, newData });
    if (snippets.length === 0) {
      throw new ErrorWithHttpStatus('ID does not exist'); // 404
    }
    // send that snippet backs
    response.send(snippets);
  } catch (err) {
    next(err);
    // else response.status(500.send('Server Error'))
  }
};
/**
 * Delete a snippet by its ID
 */
exports.deleteSnippetById = async ({ params: { id } }, response, next) => {
  // get the data: call Snippet.delete passing an id (from request.params)
  // const { id } = request.params;
  try {
    await Snippet.delete(`${id}`);
    response.status(200).send(`Deleted ${id}`);
  } catch (err) {
    next(err);
  }
};
