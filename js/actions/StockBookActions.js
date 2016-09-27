var AppDispatcher = require('../dispatcher/AppDispatcher');
var StockBookConstants = require('../constants/StockBookConstants');

var StockBookActions = {
	getStockBookInfo: function(data){
		AppDispatcher.dispatch({type: StockBookConstants.STOCKBOOK_GETINFO, data : data});
	}
};

module.exports = StockBookActions;
