const express = require("express");

const notesRoutes = require('./routes/notesRoutes.js');

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("FILES-BASED NOTES API");
});

app.use('/notes', notesRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});