const express = require('express').Router();
const readAndWrite = requre('..../db/f');
const app = express();
const notesRouter = require('/notes');

app.use('/notes, notesRouter')

module.exports= app;