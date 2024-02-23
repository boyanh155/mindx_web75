import http from 'http';
import { StringDecoder } from 'string_decoder';

const todos = []

const app = http.createServer((request, response) => {
    const endpoint = request.url;
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    request.on('data', (data) => {
        console.log(data)
        buffer += decoder.write(data);
    });

    request.on('end', () => {
        buffer += decoder.end();

        switch (endpoint) {
            case '/':
                response.end(`Hello MindX`);
                break;
            case '/todo':
                if (request.method === 'GET') {
                    response.end(JSON.stringify(todos));
                } else if (request.method === 'POST') {
                    const newTodo = JSON.parse(buffer);
                    newTodo.id = todos.length + 1;
                    request.
                    todos.push(newTodo);
                    response.end(JSON.stringify(todos));
                }
                break;
            default:
                response.end('Invalid path');
                break;
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});