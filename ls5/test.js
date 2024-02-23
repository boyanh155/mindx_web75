import path from 'path'
const __dirname = path.resolve();

const url = `http://localhost:3000/test`
const body = new FormData()

const image = path.resolve(__dirname, 'imgs', 'Screenshot 2024-01-21 at 11.50.50.png')
console.log(image)
body.append('image', image)
body.append('name', 'test')

// axios.post(url, body)