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

app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile("notes.json", "utf8", (err, data) => {

        if (err) {
            console.log("Error reading json file: ", err);
            return;
        }

        try {
            const notes = JSON.parse(data)

            const note = notes.find(n => n.id === id);

            if (!note) {
                console.log("Note not found.");
            }

            res.json(note);
        }
        catch (err) {
            console.log("INVALID JSON: ", err);
        }
    });
})

app.post('/notes', (req, res) => {
    const { title, content } = req.body;

    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading JSON file: ", err);
        }

        const notes = JSON.parse(data);

        const newNote = {
            id: notes.length + 1,
            title,
            content
        }

        if (!title || !content) {
            console.log("Title and content are required.");
            return;
        }

        if (typeof title !== 'string' || typeof content !== 'string') {
            console.log("Title and content must be strings.");
            return;
        }

        notes.push(newNote);

        fs.writeFile('notes.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.log("Error writing into JSON file: ", err);
            }

            res.send("Note added successfully.");
        })
    })
})

app.put('/notes/:id', (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);

    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading JSON file: ", err);
        }

        const notes = JSON.parse(data);

        const note = notes.find(n => n.id === id);

        note.title = title;
        note.content = content;

        if (!note) {
            console.log("Note not found.");
            return;
        }

        if (!title || !content) {
            console.log("Title and content are required.");
            return;
        }

        if (typeof title !== 'string' || typeof content !== 'string') {
            console.log("Title and content must be strings.");
            return;
        }

        fs.writeFile('notes.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.log("Error writing into JSON file: ", err);
            }

            res.send("Note added successfully.");
        })
    })
})

app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading JSON file: ", err);
            return;
        }

        const notes = JSON.parse(data);

        const note = notes.find(n => n.id === id);

        if (!note) {
            console.log("Note not found.");
            return;
        }

        const updNotes = notes.filter(note => note.id !== id);

        fs.writeFile('notes.json', JSON.stringify(updNotes, null, 2), (err) => {
            if (err) {
                console.log("Error deleting note: ", err);
            }

            res.json({ "message": "Note deleted successfully" });
        })
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});