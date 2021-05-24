var express = require('express');
var fs = require('fs')
var app = express();


app.use(express.static('static'))
app.use(express.static('static/cwiczenia'))
app.use(express.static('static/cwiczenia2'))

app.get("/cwiczenia", function (req, res) {

    fs.readdir(__dirname + "/static/cwiczenia", function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(files)
        res.send(files)

    });

})


app.listen(3000, function () {
    console.log('Słucham na porcie 3000');
});