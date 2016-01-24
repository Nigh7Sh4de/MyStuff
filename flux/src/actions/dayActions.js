var AppDispatcher = require('../dispatchers/AppDispatcher');
var dayConstants = require('../constants/dayConstants');
var axios = require('axios');

module.exports = {
    receiveData: function(data) {
        AppDispatcher.handleAction({
            actionType: dayConstants.RECEIVE_DATA,
            data: data
        })
    }
    setDay: function(day) {
        AppDispatcher.handleAction({
            actionType: dayConstants.SET_DAY,
            data: day
        })
    }
}
