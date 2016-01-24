var AppDispatcher = require('../dispatchers/AppDispatcher');
var dayConstants = require('../constants/dayConstants');
// var EventEmitter = require('events').EventEmitter;

var _days = [];

var dayStore = {
    getDay: function() {
        return _day;
    }
}

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case dayConstants.SET_DAY:
            _day = action.data;
            break;
        case dayConstants.RECEIVE_DATA:
            _day = action.data;
            break;
    }

});
