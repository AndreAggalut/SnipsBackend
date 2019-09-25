// import packages
const express = require('express');
const cors = require('cors');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
// alt shift a  -- > /*  */
/* this is our middleware */
app.use(cors());
app.use(express.json()); // parses requests with json bodies
app.use(logger);
app.use(router);
app.use(errorHandler);

module.exports = app;
