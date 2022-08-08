const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000

app.use(express.static(__dirname));

// console.log("MY_VARIABLE: " + process.env.API_KEY);

app.get(['/','/index'], (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/livemap', (req, res) => {
    res.sendFile(__dirname + "/livemap.html")
})

app.get('/mortality_religion', (req, res) => {
    res.sendFile(__dirname + '/main_point.html')
})

app.post('/creatmap', (req, res) => {

    // res.status(201).send({status: 'Ok', map:map});
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})