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
    Page.Build('default', null, function(err, result) {
        if (err != null)
            res.send(err);
        res.send(result);
    });
    // res.send(Page.Build('default'));
});

app.get('/:page', function(req, res) {
    Page.Build(req.params.page, null, function(err, result) {
        if (err != null)
            res.send(err);
        res.send(result);
    });
    // res.send(Page.Build(req.params.page));
});

app.get('/:page/:_id', function(req, res) {
    Page.Build(req.params.page, { _id: req.params._id }, function(err, result) {
        if (err != null)
            res.send(err);
        res.send(result);
    });
    // res.send(Page.Build(req.params.page, { id: req.params.id }));
});

app.get('/data/:page/:_id', function(req, res) {
    Page.Build(req.params.page, { _id: req.params._id }, function(err, result) {
        if (err != null)
            res.send({err: err, result: result});
        res.send(result);
    }, true);
    // res.send(Page.Build(req.params.page, { id: req.params.id }));
});

app.patch('/:page/:_id', bodyParser.json(), function(req, res) {
    _db.update(req.params.page, req.params._id, req.body, function(err, result) {
        res.send({err: err, result: result});
    });
    // res.send(_db.Update(req.params.page, req.body));
})

http.createServer(app).listen(port);
console.log('Started on port ' + port)
