// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDBnpm 

mongoose.connect('mongodb+srv://codeblaze08:8SUNRDz9RsSnPTef@clusti.wrubfru.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for successful connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple mongoose model
const Todo = mongoose.model('Todo', { text: String });

app.get('/', async (req, res) => {
  // Create a new todo
  const newTodo = new Todo({ text: 'Sample Todo' });
  await newTodo.save();

  // Retrieve all todos from the database
  const todos = await Todo.find();

  // Send the todos as JSON response
  res.json(todos);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
