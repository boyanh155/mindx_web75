const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

let todos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        let response;
        switch (trimmedPath) {
            case 'todo':
                switch (req.method) {
                    case 'POST':
                        const newTodo = { id: idCounter++, text: buffer };
                        todos.push(newTodo);
                        response = newTodo;
                        break;
                    case 'GET':
                        response = todos;
                        break;
                    case 'PUT':
                        const updatedTodo = JSON.parse(buffer);
                        const index = todos.findIndex(todo => todo.id === updatedTodo.id);
                        if (index !== -1) {
                            todos[index] = updatedTodo;
                            response = updatedTodo;
                        } else {
                            response = { error: 'Todo not found' };
                        }
                        break;
                    case 'DELETE':
                        const idToDelete = JSON.parse(buffer).id;
                        const initialLength = todos.length;
                        todos = todos.filter(todo => todo.id !== idToDelete);
                        response = { success: todos.length < initialLength };
                        break;
                    default:
                        response = { error: 'Invalid method' };
                        break;
                }
                break;
            default:
                response = { error: 'Invalid path' };
                break;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});