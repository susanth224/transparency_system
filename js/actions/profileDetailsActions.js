var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileDetailsConstants = require('../constants/profileDetailsConstants');
var ProfileDetailsActions = {
	getProfileDetails: function(details){
		AppDispatcher.dispatch({actionType: 
            ProfileDetailsConstants.PROFILE_GETDETAILS,ProfileDetails:details});
		},
	getMyDonations: function(MyDonations){
		console.log("here is action",MyDonations);
		AppDispatcher.dispatch({actionType: 
            ProfileDetailsConstants.PROFILE_MYDONATIONS,MyDonations:MyDonations});
		}
	};
module.exports = ProfileDetailsActions;