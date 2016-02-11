var mongojs = require('mongojs');
var db = mongojs('meelz', ['foods', 'days', 'settings']);

Array.prototype.findIndexById = function(ID) {
    for (var i=0;i<this.length;i++) {
        if (this[i].id == ID) {
            return i;
        }
    }
    return null;
}

var _db = {
    update: function(collection, id, item, callback) {
        id = id.toString();
        if (item._id != null)
            delete item._id;
        db[collection].update({_id: mongojs.ObjectId(id)}, {$set:item}, {multi: false}, callback);
    },

    find: function(collection, search, callback) {
        if (search['_id'] != null) {
            if (typeof search['_id'] == 'string')
                search['_id'] = mongojs.ObjectId(search['_id']);
            else if (search['_id']['$in'] != null)
                search._id.$in = search._id.$in.map(function(i) {
                    return typeof i == 'string' ? mongojs.ObjectId(i) : i;
                });
        }
        if (collection == 'days') {
            db.settings.findOne({
                name: 'home_cols'
            }, function(err, cols) {
                db.days.find(
                function(err, days) {
                    var c = 0;
                    var mappedDays = [];
                    var next = function() {
                        c++;
                        if (c >= days.length) {
                            callback(err, mappedDays);
                        }
                    }
                    if (days.length == 0)
                        next();

                    days.forEach(function(day) {
                        var foodIds = day.food.map(function(f) {
                            return mongojs.ObjectId(f);
                        });
                        var mult = {};
                        day.food.forEach(function (el, index) {
                            if (mult[el] == null)
                                mult[el] = 0;
                            mult[el]++;
                        })
                        db.foods.find({_id:{$in: foodIds}}, function(err, foundFoods) {
                            var total = {};
                            cols.value.forEach(function (c) {
                                foundFoods.forEach(function (f) {
                                    if (total[c] == null)
                                        total[c] = 0;
                                    total[c] += f[c] * mult[f._id];
                                })
                            })
                            day.totals = total;
                            delete day.totals._id;
                            mappedDays.push(day);
                            next();
                        })
                    });

                });

            });
        }
        else {
            db[collection].find(search, callback);
        }
    },

    findOne: function(collection, search, callback) {
        if (search['_id'] != null && typeof search['_id'] == 'string')
            search['_id'] = mongojs.ObjectId(search['_id']);
        db[collection].findOne(search, callback);
    }
}

module.exports = _db;
