var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BillConstants = require('../constants/BillConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var billdata = {};

var BillStore = assign({}, EventEmitter.prototype,{
	getBillInfo: function(){
		 return billdata;
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
        switch(action.type){
			case BillConstants.BILL_GETINFO:
				billdata = action.data;
				BillStore.emitChange();
                break;
            default:
        }
    })
});
module.exports = BillStore;