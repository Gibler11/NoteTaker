const notes = require('express').Router();
const{readAndWriteFile, readFromFile}= require('../db/fsUtils');

notes.get('/notes',(req, res)=> {
    readFromFile('../../db.json')
    .then((data) =>{
        res,json(JSON.parse(data))
    })
})

module.exports= notes