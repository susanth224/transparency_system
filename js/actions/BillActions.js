var AppDispatcher = require('../dispatcher/AppDispatcher');
var BillConstants = require('../constants/BillConstants');

var BillActions = {
	getBillInfo: function(data){
		AppDispatcher.dispatch({type: BillConstants.BILL_GETINFO, data : data});
	}
};

module.exports = BillActions;
