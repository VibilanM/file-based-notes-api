const fs = require("fs");

function readNotes(callback) {
    fs.readFile("notes.json", "utf8", (err, data) => {

        if (err) {
            return callback(err);
        }

        try {
            const notes = JSON.parse(data);
            callback(null, notes);
        }
        catch (err) {
            callback(err, null);
        }
    });
}

function writeNotes(notes, callback) {
    fs.writeFile("notes.json", JSON.stringify(notes, null, 2), callback);
}

module.exports = {
    readNotes,
    writeNotes
};