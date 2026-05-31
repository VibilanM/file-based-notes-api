const express = require("express");
const router = express.Router();

const { readNotes, writeNotes } = require("../helpers/fileHelper.js");

const validateNote = require("../validation/noteValidation.js");

router.get('/', (req, res) => {

    readNotes((err, notes) => {

        if (err) {
            return res.status(500).json({ "message": "Could not read JSON file." })
        }

        res.json(notes);
    });
});

router.get('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    readNotes((err, notes) => {

        if (err) {
            return res.status(500).json({ "message": "Could not read JSON file." });
        }

        const note = notes.find(n => n.id == id);

        if (!note) {
            return res.status(404).json({ "message": "Note not found" });
        }

        res.json(note);
    })
})

router.post('/', (req, res) => {

    const { title, content } = req.body;

    const error = validateNote(title, content);

    if (error) {
        return res.status(500).json({ message: error });
    }

    readNotes((err, notes) => {

        if (err) {
            return res.status(500).json({ message: "Could not read JSON file." });
        }

        let id = notes.length + 1;

        const idExists = notes.find(n => n.id === id);

        if (idExists) {
            id++;
        }

        const note = {
            id,
            title,
            content
        };

        notes.push(note);

        writeNotes(notes, (err) => {

            if (err) {
                return res.status(500).json({ message: "Could not write to notes file." });
            }

            return res.status(201).json(note);
        })
    });
});

router.put('/:id', (req, res) => {

    const id = req.params.id;

    const { title, content } = req.body;

    const error = validateNote(title, content);

    if (error) {
        return res.status(500).json({message: error});
    }

    readNotes((err, notes) => {

        if (err) {
            return res.status(500).json({Message: "Could not read JSON file."});
        }

        const note = notes.find(n => n.id === id);

        note.title = title;
        note.content = content;

        writeNotes(notes, (err) => {

            if (err) {
                return res.status(500).json({message: "Could not write into JSON file."});
            }

            return res.status(200).json(note);
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    readNotes((err, notes) => {

        if (err) {
            return res.status(500).json({message: "Could not read JSON file."});
        }

        const note = notes.find(n => n.id === id);

        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }

        const updatedNotes = notes.filter(n => n.id !== id);

        writeNotes(updatedNotes, (err) => {

            if (err) {
                return res.status(500).json({message: "Could not write into JSON file."});
            }

            return res.status(200).json({message: "Note deleted successfully"});
        });
    });
});

module.exports = router;