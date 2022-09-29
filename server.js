const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();
const fs = require('fs');
const noteData = require('./db/db.json');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(noteData));

fs.readFile(noteData, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // JSON.parse(data);
    console.log(data);
  });

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);