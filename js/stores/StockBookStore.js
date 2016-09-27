var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StockBookConstants = require('../constants/StockBookConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var stockbookdata = {};

var StockBookStore = assign({}, EventEmitter.prototype,{
	getStockBookInfo: function(){
		 return stockbookdata;
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
			case StockBookConstants.STOCKBOOK_GETINFO:
				stockbookdata = action.data;
				StockBookStore.emitChange();
                break;
            default:
        }
    })
});
module.exports = StockBookStore;