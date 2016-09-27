var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DonationConstants = require('../constants/DonationConstants');
var DonationCalls = require('../webutils/DonationCalls');
var assign = require('object-assign');
var access_token;
var CHANGE_EVENT = 'change';
var allDonations=[];
var totalDonation;
var totalBill;
var donationsBills=[];
var DonationsStore = assign({}, EventEmitter.prototype,{
	 getAllList: function(){
        console.log("donations",allDonations);
		return allDonations;
    },
    getTotalDonation:function(){
        return totalDonation;
    },
    getTotalBill:function(){
        return totalBill;
    },
	getDonationsBills:function(){
		return donationsBills;
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
			case DonationConstants.DONATION_GETALL:
				allDonations=(action.Donations.donations);
                totalBill=action.Donations.totalBill;
                totalDonation=action.Donations.totalDonation;
                DonationsStore.emitChange();
                break;
			case DonationConstants.DONATION_BILLS:
				donationsBills=(action.DonationBills);
				console.log(donationsBills);
				DonationsStore.emitChange();
        }
    })
});
module.exports = DonationsStore;
