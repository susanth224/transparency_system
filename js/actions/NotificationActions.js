var AppDispatcher = require('../dispatcher/AppDispatcher');
var NotificationConstants = require('../constants/NotificationConstants');

var DiscussionActions = {
    getdata: function(text){
        AppDispatcher.dispatch({actionType: 
            NotificationConstants.NOTIFICATION_STORE,text:text});
    },
    getunreadcount: function(num){
        AppDispatcher.dispatch({actionType: 
            NotificationConstants.NOTIFICATION_UNREADCOUNT,num:num});
    },   
};
module.exports = DiscussionActions;
