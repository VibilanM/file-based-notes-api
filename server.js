const express = require("express");
const app = express();

const fs = require("fs");

const port = 3000;

app.use(express.json());

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

app.post('/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading JSON file: ", err);
        }

        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile('notes.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.log("Error writing into JSON file: ", err);
            }

            res.send("Note added successfully.");
        })
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});