const mongoose = require("mongoose");
const express = require("express");
const Todo = require("./model/Todo.js");

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://liviucaciulatu:Converse10@cluster0.gsylu01.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post('/api/todo', (req, res) => {
  const title = req.body.title;
  const comment = req.body.comment;
  const createdAt = Date.now();
  const newTodo = new Todo({
    title,
    comment,
    createdAt
  });

  newTodo.save()
    .then(todo => {
      res.json(todo);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.get('/api/todo', (req, res) => {
  Todo.find()
    .then(todos => {res.json(todos);})
    .catch(err => {console.log(err); res.status(500).json({ error: 'An error occurred' });
    });
});

const port = 3000; // Change it to the desired port number
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});