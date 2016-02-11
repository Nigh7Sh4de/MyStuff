var React = require('React');
var ReactDOM = require('react-dom/server');
var _db = require('./db');

var indexPage = require('./src/components/index');
var daysPage = require('./src/components/days');
var foodsPage = require('./src/components/foods');
var editFoodPage = require('./src/components/editfood');

var Page = {
    index: indexPage,
    days: daysPage,
    foods: foodsPage,
    editfood: editFoodPage
}

Page.default = Page.days;

var render = function(page, params) {
    var s = ReactDOM.renderToString(Page.index({page: page(params), pageParams: params}));
    return s;
}

Page.Build = function(page, params, callback, dataOnly) {
    if (typeof page == "string")
        page = Page[page.toLowerCase()];

    if (page == null)
        return "404";

    if (page == Page.foods) {
        if (params == null) {
            _db.find('foods', {}, function(err, result) {
                if (err != null)
                    callback(err, result);
                params = {
                    data: {
                        foods: result
                    }
                };
                callback(null, dataOnly ? params : render(page, params));
            });
        } else if (params._id != null) {
            var _foods = [];
            _db.findOne('days', {_id: params['_id']}, function(err, doc) {
                if (err != null)
                    callback(err, doc);
                _db.find('foods', doc.archive ? {_id: {$in: doc.food}} : {}, function(err, result) {
                    if (err != null)
                        callback(err, result);
                    params.data = {
                        foods: result,
                        day: doc
                    };
                    callback(null, dataOnly ? params : render(page, params));
                });
            });

        }
    }
    else if (page == Page.days) {
        var params = {
            data: {}
        }
        var i = 0;
        var next = function(err) {
            i++;
            if (err != null)
                callback(err, result);
            if (i >= 2) {
                callback(null, render(page, params));
            }
        }
        _db.find('days', {}, function(err, result) {
            params.data.days = result;
            next(err);
        });
        _db.findOne('settings', {name: 'home_cols'}, function(err, doc) {
            params.data.home_cols = doc.value;
            next(err);
        })
    }
    else if (page == Page.editfood) {
        var params = {}
        var i = 0;
        var next = function(err) {
            i++;
            if (err != null)
                callback(err, result);
            if (i >= 2) {
                callback(null, render(page, params));
            }
        }
        _db.findOne('foods', {id: params._id}, function(err, result) {
            params.food = result;
            next(null);//, render(page, { food: result }));
        });
        _db.findOne('settings', {name: 'props'}, function(err, doc) {
            params.props = doc.value;
            next(err);
        })
    }
    else {

        callback(null, render(page, params));
    }
}

module.exports = Page;
