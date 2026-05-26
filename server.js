const express = require("express");
const app = express();

const fs = require("fs");

const port = 3000;

app.get('/', (req, res) => {
    res.json({ message: "Hello World." });
});

app.get('/notes', (req, res) => {

    fs.readFile("notes.json", "utf8", (err, data) => {

        if (err) {
            console.log("Error reading json file: ", err);
            return;
        }

        try {
            const notes = JSON.parse(data)
            res.json(notes);
        }
        catch (err) {
            console.log("INVALID JSON: ", err);
        }
    });

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});