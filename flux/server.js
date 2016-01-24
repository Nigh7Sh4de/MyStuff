require('babel-register')({
    presets: ['react']
});
var React = require('react');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var Page = require('./page');
var _db = require('./db');

var app = express();

var port = 8080;

app.use(express.static('public'));
// app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(req, res) {
    res.send(Page.Build('default'));
});

app.get('/:page', function(req, res) {
    res.send(Page.Build(req.params.page));
});

app.get('/:page/:id', function(req, res) {
    res.send(Page.Build(req.params.page, { id: req.params.id }));
});

app.patch('/:page', bodyParser.json(), function(req, res) {
    res.send(_db.Update(req.params.page, req.body));
})

http.createServer(app).listen(port);
console.log('Started on port ' + port)
