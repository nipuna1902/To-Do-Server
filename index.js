const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let nextId = 1;

app.get('/', (req,res)=> {
  res.send("TO-DO HOME PAGE");
});

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = { id: nextId++, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'To-do not found' });
  }

  const deleted = todos.splice(index, 1);
  res.status(200).json(deleted);
});

app.listen(PORT, () => {
  console.log(`To-Do server on http://localhost:${PORT}`);
});