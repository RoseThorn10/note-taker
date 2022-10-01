const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const uuid = require('uuid');
// const noteData = require('./db/db.json');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => res.send(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.get('/api/notes', (req, res) => {

  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      res.json(JSON.parse(data));
    }
    // console.log(data);
    
  });
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body
  const noteObj =
  {
    title,
    text
  }
  readAndAppend(noteObj, './db/db.json')
})

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);