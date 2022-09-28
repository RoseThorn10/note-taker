const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();
const noteData = require('./db/db.json');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => res.send(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);