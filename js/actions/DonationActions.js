var AppDispatcher = require('../dispatcher/AppDispatcher');
var DonationConstants = require('../constants/DonationConstants');

var DonationActions = {
	getAllDonations: function(Donations){
		AppDispatcher.dispatch({actionType: 
            DonationConstants.DONATION_GETALL,Donations:Donations});
		},
	getAllDonationsBills : function(bills){
        AppDispatcher.dispatch({actionType:
            DonationConstants.DONATION_BILLS,
            DonationBills:bills});
    }
	};
module.exports = DonationActions;
