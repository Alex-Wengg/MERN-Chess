require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'

// use body parser to get data from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use API routes from the api folder
const apis = require("./api");
app.use("/api", apis);

app.listen(port, () => console.log(`Listening on port ${port}`));


const dbName = 'piece'
let db

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  // Storing a reference to the database so you can use it later
  db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
})

mongoose.connect(url, { useNewUrlParser: true })
 db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})