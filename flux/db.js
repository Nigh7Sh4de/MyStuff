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
        "home_cols": ["calories"],
        "props": ["name", "calories"]
    },

    _propTypes: [
        "text",
        "number"
    ],

    _days: [
        {
            "id": 0,
            "food": [0, 1, 2],
            "date": "Fri Nov 13 2015",
            "archive": true
        },
        {
            "id": 1,
            "food": [0],
            "date": "Sat Nov 14 2015",
            "archive": true
        },
        {
            "id": 2,
            "food": [1, 3],
            "date": "Sun Nov 15 2015",
            "archive": true
        },
        {
            "id": 3,
            "date": "Mon Nov 16 2015",
            "food": []
        }
    ],

     _foods: [
        {
            "id": 0,
            "name": "Mashed Potatoes"
        },
        {
            "id": 1,
            "name": "Chicken Breast"
        },
        {
            "id": 2,
            "name": "Vegetables"
        },
        {
            "id": 3,
            "name": "Spaghetti"
        }
    ],

    Update: function(arr, el) {
        if (arr[0] != '_')
            arr = '_'.concat(arr);
        if (this[arr] == null)
            return "Error. " + arr + " is not a valid data document";
        var foundIndex = this[arr].findIndexById(el.id);
        if (!foundIndex)
            return ("Error. Could not find item with id " + el.id + " in " + arr);
        return(this[arr][foundIndex] = Object.assign(this[arr][foundIndex], el));
    }
}

module.exports = _db;
// module.exports = { Update, _db._settings, _db._propTypes, _db._days, _db._foods };
