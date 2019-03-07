const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static("./public"));

app.get('/', function (req, res) {
    let fileName = path.resolve('./public/index.html');
    res.sendFile(fileName)
})

app.get('/2.1', function (req, res) {
    let fileName = path.resolve('./public/2.1.html');
    res.sendFile(fileName)
})

app.get('/2.2', function (req, res) {
    let fileName = path.resolve('./public/2.2.html');
    res.sendFile(fileName)
})


app.listen(3000)