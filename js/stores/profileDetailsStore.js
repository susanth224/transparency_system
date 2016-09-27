var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileDetailsConstants = require('../constants/profileDetailsConstants');
var ProfileDetailsCalls = require('../webutils/profileDetailscalls');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var access_token;
var CHANGE_EVENT = 'change';
var profileDetails=[];
var MyDonations=[];
var MyTotalDonation;
var MyTotalBill;
var ProfileDetailsStore = assign({}, EventEmitter.prototype,{
	 getMyList: function(){
		return MyDonations;
    },
    getMyTotalDonation:function(){
        return MyTotalDonation;
    },
    getMyTotalBill:function(){
        return MyTotalBill;
    },
	 getProfileDetails: function(){
        console.log("ProfileDetails",profileDetails);
		return profileDetails;
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
			case ProfileDetailsConstants.PROFILE_GETDETAILS:
                console.log("Details",action.ProfileDetails);
				profileDetails=(action.ProfileDetails);
                ProfileDetailsStore.emitChange();
                break;
			case ProfileDetailsConstants.PROFILE_MYDONATIONS:
				MyDonations=(action.MyDonations.myDonations);
                MyTotalBill=action.MyDonations.totalBill;
                MyTotalDonation=action.MyDonations.totalDonation;
				console.log("HERE",MyDonations,MyTotalBill,MyTotalDonation);
                ProfileDetailsStore.emitChange();
                break;
        }
    })
});
module.exports = ProfileDetailsStore;
