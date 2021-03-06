const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile)

/**
 * Function to push objects into array on database file given content and file path
 * @param {object} content the note object that is being added to the database
 * @param {string} file The path to the file that note is being written to 
 * @return {void} Nothing
 */
const readAndWriteFile = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            const parsedFacts = JSON.parse(data)
            parsedFacts.push(content);
            writeToFile(file, parsedFacts)
            console.log("content")
        }
    })
}

/**
 * Function to iterate through array and search for when object.id === note.id
 * @param {array} parsedData Array that will be searched for matching note.id
 * @param {number} noteId number pulled from object.id property
 * @return {number} index number of object with matching id property
 */
 const getNoteIndex = (parsedData, noteId) => {
    for(let i = 0; i<parsedData.length; i++) {
        if (parsedData[i].id == noteId) {
            return i
        }
    }}

/**
 * Function that searches for object in array with matching id property and removes that element from array and then re-updates database post-deletion
 * @param {string} file The path to the file that note is being removed from 
 * @param {number} noteId number pulled from object.id property
 * @return {void} Nothing
 */
const deleteNote = (file, noteId) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err) 
        } else {
            const parsedFacts = JSON.parse(data)
            parsedFacts.splice(getNoteIndex(parsedFacts, noteId),1)
            writeToFile(file, parsedFacts)
        }
    })
}

/**
 * Function that converts content to string and overwrites database file with newly converted string
 * @param {string} fileName The path to the file that the content is being added to
 * @param {object} content the ojbect that will be stringified and added to the fileName
 */
function writeToFile(fileName, content) {
    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => err ? console.error(err) : console.info(`\nData written to ${fileName}`))
}
module.exports = { readAndWriteFile, readFromFile, deleteNote }