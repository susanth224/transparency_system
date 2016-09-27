var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NGOConstants = require('../constants/NGOConstants');
var assign = require('object-assign');

var goal;
var days_left;
var cards=[];
var DonorsList=[];
var campaignsList=[];
var subcampaignsList=[];
var CHANGE_EVENT = 'change';
var funded=0;
function get_spent_details_Cards(spent_details_cardsList){
  cards=spent_details_cardsList;
  console.log("get_spent_details_Cards", cards);
}

function getListOfCampaigns(CampaignsList){
  campaignsList=campaignsList.concat(CampaignsList);
  console.log("campaignsList", campaignsList);
  if(campaignsList.length>0){
    goal=campaignsList[0]['goal'];
    days_left=campaignsList[0]['timeLeft'];
  }  
}
function getListOfSubKampaigns(SubCampaignsList){
  subcampaignsList=subcampaignsList.concat(SubCampaignsList);
  SubCampaignsList.map(function(subcampaign,index){
            console.log("subcampaign",subcampaign["fulfilledQuantity"]);
            funded=Number(subcampaign["fulfilledQuantity"])+funded;
         }
        );
  console.log("funded in stores",funded);
  console.log("subcampaignsList", subcampaignsList);
}
function ListofDonors(donorsList){
  DonorsList=donorsList;
  console.log("DonorsList",DonorsList);
}

var NGODetailsStore = assign({}, EventEmitter.prototype,{
    get_spent_details_Card:function(){
      console.log("i am store",cards);
      return cards;
    },
    getCampaignsList:function () {
        return campaignsList;
    },
    getSubCampaignsList:function () {
        return subcampaignsList;
    },
    getDonorsList:function(){
    return DonorsList;
    },    
    getGoals:function()
    {
    	console.log("goalsssss....",goal);
        return goal;
    },
    getDaysLeft:function()
    {
        return days_left;
    },
    getFundedDetails:function()
    {
    	return funded;
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
        var text;
        switch(action.actionType){
            case NGOConstants.NGO_CREATE:
                text = action.text;
                if(text !== ''){
                 create(text);
                    NGODetailsStore.emitChange();
                }
                break;
            case NGOConstants.NGO_SPENT_DETAILS_CARDS:
                spent_details_cardslist = action.spent_details_cardslist;
                if(spent_details_cardslist !== ''){
                 get_spent_details_Cards(spent_details_cardslist);
                    NGODetailsStore.emitChange();
                }
                break;
            case NGOConstants.NGO_DONORSLIST:
                DonorsList = action.DonorsList;
                if(DonorsList !== ''){
                 ListofDonors(DonorsList);
                    NGODetailsStore.emitChange();
                }
                break;    
            case NGOConstants.ListOfCampaigns:
                CampaignsList= action.CampaignsList;
                if(CampaignsList !== ''){
                 getListOfCampaigns(CampaignsList);
                    NGODetailsStore.emitChange();
                }
                break; 
                 case NGOConstants.ListOfSubCampaigns:
                SubCampaignsList= action.SubCampaignsList;
                if(SubCampaignsList !== ''){
                 getListOfSubKampaigns(SubCampaignsList);
                    NGODetailsStore.emitChange();
                }
                break; 
            default:
        }
    })
});
module.exports = NGODetailsStore;