// import packages
const express = require('express');
// const Snippet = require('../model/Snippet.model.js');
const snippets = require('../controllers/snippets.controller');
const author = require('../controllers/author.controller');

const router = express.Router();
router.get('/', (request, response) => {
  console.log(`We're in the router!`);
  response.send('Welome to Snips');
});

router.get('/api', (request, response) => {
  response.send('Welcome to the Snips API');
});
/*  Snippets Routes */
router.post('/api/snippets', snippets.createSnippet);

router.get('/api/snippets', snippets.getSnippet);

router.get('/api/snippets/:id/', snippets.getSnippetById);

router.patch('/api/snippets/:id/', snippets.updateSnippetById);

router.delete('/api/snippets/:id/', snippets.deleteSnippetById);

/* author routes */
router.post('/api/signup', author.signup);
router.patch('/api/login', author.login);

module.exports = router;
