const Snippet = require('./model/Snippet.model.js');

async function testModels() {
  const snippets = await Snippet.select();
  console.log(snippets);
}
testModels();
