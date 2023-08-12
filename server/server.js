const { connectToDb, getDb } = require('./database/db');

const { ObjectID } = require('mongodb');
require('dotenv').config()
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let db
connectToDb((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port: ", process.env.PORT)
    })
  }
  db = getDb()
})

app.get('/', (req, res) => {
  res.send('Home page working')
})

app.get('/all', async (req, res) => {
  const result = await db.collection('expenses').find().toArray()
  const regularJSON = JSON.parse(JSON.stringify(result));
  res.json(regularJSON)
})

app.post('/addExpense', (req, res) => {
  data = {
    title: req.body['title'],
    amount1: parseInt(req.body["amount1"]),
    amount2: parseInt(req.body["amount2"]),
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    comment: req.body.comment,
    resolved: req.body.resolved
  }
  db.collection('expenses').insertOne(data)
    .then((result) => {
      console.log('Document inserted successfully:', result.insertedId);
      return res.status(201).json({...req.body, _id: result.insertedId})
    })
    .catch((err) => {
      console.error('Error while inserting document:', err);
      throw new Error(`${err}`);
    });
})

app.delete('/delete-expense/:id', async (req, res) => {
  let idToDelete = req.params.id;
  console.log('id to delete: ', idToDelete);

  try {
    const objectId = new ObjectId(idToDelete);

    const result = await db.collection('expenses').deleteOne({ _id: objectId });
    console.log('deleted count: ', result.deletedCount);

    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
      res.status(200).send('Document deleted successfully');
    } else {
      console.log('Document not found');
      res.status(404).send('Document not found');
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.patch('/addResolved', async (req, res) => {
  console.log('Received PATCH request');
  try {
    const document = await db.collection('expenses').findOne({ _id: new ObjectId(req.body._id) });
    if (!document) {
      res.status(404).json({ ok: false, message: 'Document not found' });
      return;
    }

    const newValue = !document.resolved; 
    const updateResult = await db.collection('expenses').updateOne(
      { _id: new ObjectId(req.body._id) },
      { $set: { resolved: newValue } }
    );

    if (updateResult.modifiedCount > 0) {
      console.log('Document Updated Successfully');
      res.status(200).json({ ok: true });
    } else {
      console.log('Document Not Updated');
      res.status(500).json({ ok: false, message: 'Document not updated' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
});