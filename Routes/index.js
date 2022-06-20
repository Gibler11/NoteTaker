const express = require('express').Router();
const path = require('path');
const notes = require('./api/notes');
const app= express();

notes.get
express.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

notes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = express;