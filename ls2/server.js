import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
app.use(bodyParser.json());

let todos = [];

// Load todos from file
fs.readFile('todos.json', (err, data) => {
    if (err) throw err;
    todos = JSON.parse(data);
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };
    todos.push(todo);

    // Save todos to file
    fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
        if (err) throw err;
    });

    res.status(201).json(todo);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));