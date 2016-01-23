require('babel-register')({
    presets: ['react']
});
var React = require('react');
var express = require('express');
var http = require('http');
var Page = require('./page');

var app = express();

var port = 8080;

app.get('/', function(req, res) {
    res.send(Page.Build('default'));
});

app.get('/:page', function(req, res) {
    res.send(Page.Build(req.params.page));
});

http.createServer(app).listen(port);
console.log('Started on port ' + port)
