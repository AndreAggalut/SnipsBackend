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

app.listen(5000, () => {
  console.log('Snips server running on port 5000');
});
// app.listen(5000, () => {
//   console.log('Snips server running on port 5000');
// });
