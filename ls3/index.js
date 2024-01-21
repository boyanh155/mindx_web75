import express from "express"
import axios, * as others from 'axios';
const app = express()

app.use(express.json())

app.put('/users/:id', async(req, res) => {
const connectionString = `mongodb+srv://loclh:1@cluster0.e7o8byz.mongodb.net/`
    try {
        const {
            data
        } = await axios.put(`http://localhost:8000/users/${req.params.id}`, req.body)
        res.send(data)

    } catch (err) {
        console.log(err)
        res.status(err.status | 500).send(err.message)
    }
});

app.listen(3000, () => {

})