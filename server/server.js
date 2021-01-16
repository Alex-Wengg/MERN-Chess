require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const mongoose = require('mongoose')
const MongoClient = require('mongodb')
const url = 'mongodb://localhost:27017/myproject'

// use body parser to get data from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Use API routes from the api folder
const apis = require("./api");
app.use("/api", apis);

app.listen(port, () => console.log(`Listening on port ${port}`));


const dbName = 'piece'
let db

// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) return console.log(err)
//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName)
//   console.log(`Connected MongoDB: ${url}`)
//   console.log(`Database: ${dbName}`)
// })

// mongoose.connect(url, { useNewUrlParser: true })
//  db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })
// Connect to Mongo
mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));