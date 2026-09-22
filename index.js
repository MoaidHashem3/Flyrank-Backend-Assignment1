const express = require('express');
const app = express();
const port = 3000;
app.use( express.json());

// in memory data store
const TASKS = [
  { id: 1, title: 'Cook dinner', done: false },
  { id: 2, title: 'Complete assignment', done: true },
  { id: 3, title: 'Call mom', done: false },
];

// Stage 0
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Stage 1
app.get('/', (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
});

app.get('/health', (req, res) => {
    res.json({ "status": "ok" });
});

// Stage 2

// return the whole list
app.get('/tasks', (req, res) => {
  res.json(TASKS);
});

// returns a single task by id
app.get('/tasks/:id', (req, res) => {

  const taskId = parseInt(req.params.id, 10);
  const task = TASKS.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: `Task ${taskId} not found` });
  }

  res.json(task);
});

// Stage 3

app.post('/tasks', (req, res) => {

  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and cannot be empty please make sure to add one' });
  }

  const nextId = TASKS.length > 0 ? Math.max(...TASKS.map((t) => t.id)) + 1 : 1;

  const newTask = {
    id: nextId,
    title: title.trim(),
    done: false,
  };

  TASKS.push(newTask);

  res.status(201).json(newTask);
});


app.listen(port, () => {
  console.log(`app running on port ${port}`);
});