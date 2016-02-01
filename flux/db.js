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
    _settings: {
        // "home_cols": ["calories"],
        // "props": ["name", "calories"]
    },

    // _propTypes: [
    //     "text",
    //     "number"
    // ],

    _days: [
        // {
        //     "id": 0,
        //     "food": [0, 1, 2],
        //     "date": "Fri Nov 13 2015",
        //     "archive": true
        // },
        // {
        //     "id": 1,
        //     "food": [0],
        //     "date": "Sat Nov 14 2015",
        //     "archive": true
        // },
        // {
        //     "id": 2,
        //     "food": [1, 3],
        //     "date": "Sun Nov 15 2015",
        //     "archive": true
        // },
        // {
        //     "id": 3,
        //     "date": "Mon Nov 16 2015",
        //     "food": []
        // }
    ],

     _foods: [
        // {
        //     "id": 0,
        //     "name": "Mashed Potatoes"
        // },
        // {
        //     "id": 1,
        //     "name": "Chicken Breast"
        // },
        // {
        //     "id": 2,
        //     "name": "Vegetables"
        // },
        // {
        //     "id": 3,
        //     "name": "Spaghetti"
        // }
    ],

    update: function(collection, id, item, callback) {
        id = id.toString();
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
            }, function(err, doc) {
                // var totalObj = {
                //     _id: null
                // };
                // doc.value.forEach(function(c) {
                //     totalObj[c] = {$sum: '$' + c}
                // });
                db.days.find(
                function(err, days) {
                    // console.log('db found the following days: ' + JSON.stringify(days));
                    var c = 0;
                    var next = function() {
                        c++;
                        if (c >= days.length) {
                            // console.log('db mapped the following days:::' + JSON.stringify(mappedDays));
                            callback(err, mappedDays);
                        }
                    }

                    var mappedDays = [];
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
                        db.foods.aggregate([
                            { $match: {_id:{$in: foodIds}} }
                        //,
                        //    { $group: totalObj }
                        ], function(err, foundFoods) {
                            var total = {};
                            doc.value.forEach(function (c) {
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

                    // );
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

    // Update: function(arr, el) {
    //     if (arr[0] != '_')
    //         arr = '_'.concat(arr);
    //     if (this[arr] == null)
    //         return "Error. " + arr + " is not a valid data document";
    //     var foundIndex = this[arr].findIndexById(el.id);
    //     if (!foundIndex)
    //         return ("Error. Could not find item with id " + el.id + " in " + arr);
    //     return(this[arr][foundIndex] = Object.assign(this[arr][foundIndex], el));
    // }
}

module.exports = _db;
// module.exports = { Update, _db._settings, _db._propTypes, _db._days, _db._foods };
