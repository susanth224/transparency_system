var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DiscussionConstants = require('../constants/NotificationConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var notifications=[];
var unreadcount;
function storedata(text){
        notifications=notifications.concat(text);
        NotificationStore.emitChange();

}
var NotificationStore = assign({}, EventEmitter.prototype,{
    getAll: function(){	
        return notifications;
    },
    getCount:function(){
        //console.log("un read",unreadcount);
        return unreadcount;
    },
    emitChange: function(){
        return this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherIndex: AppDispatcher.register(function(action){
        switch(action.actionType){
            case DiscussionConstants.NOTIFICATION_STORE:
                    storedata(action.text);
                    NotificationStore.emitChange();                
                break;
             case DiscussionConstants.NOTIFICATION_UNREADCOUNT:
                    //console.log("unred",action.num);
                    unreadcount=action.num;
                    NotificationStore.emitChange();
                break;   
            default:
        }
    })
});
module.exports = NotificationStore;
