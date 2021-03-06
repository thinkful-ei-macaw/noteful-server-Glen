require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
// const validateBearerToken = require('./validateBearerToken');
const { NODE_ENV } = require('./config');
const foldersRouter = require('./folders/folders-router');
const notesRouter = require('./notes/notes-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const errorHandler = (error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'Server error' } };
  } else {
    response = { message: error.message, error };
  }

  res.status(500).json(response);
};

app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});


// set up middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use(validateBearerToken);

app.use('/api/folders', foldersRouter);
app.use('/api/notes', notesRouter);

// request handling


// error handling
// eslint-disable-next-line no-unused-vars



// the bottom line, literally
module.exports = app;