import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;
const classes = [{
    age: 9
}, {
    age: 11
}, {
    age: 12
}, {
    age: 8
}]




// QUERY

app
    .route('/todo')
    .get((req, res) => {
        axios.get(`https://654f7637358230d8f0cd577c.mockapi.io/todo`).then(_res => {

            res.send(_res.data)
        }).catch(err => {
            res.status(500).send(err)
        })
    })
    .post((req, res) => {
        console.log(req.body)
        axios.post(`https://654f7637358230d8f0cd577c.mockapi.io/todo`, req.body).then(_res => {
            if (_res.status === 201 || _res.status === 200) {
                res.send('Thanh cong')
            } else {
                res.send('That bai')
            }
        }).catch(err => {
            res.status(500).send(err)
        })
    })

// PARAMS - SLUG
app.get('/:conditionAge', (req, res) => {
    // findIndex, map, filter, find
    const matchAge = classes.find((a, b) => a.age == req.params.conditionAge)
    res.send(matchAge);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});