var AppDispatcher = require('../dispatcher/AppDispatcher');
var NGOConstants = require('../constants/NGOConstants');

var NGOActions = {
    create: function(text){
        AppDispatcher.dispatch({actionType: 
            NGOConstants.NGO_CREATE,
         text:text});
    },
    receivedcards : function(spent_details_cardslist){
        AppDispatcher.dispatch({actionType:
            NGOConstants.NGO_SPENT_DETAILS_CARDS,
            spent_details_cardslist:spent_details_cardslist});
    },
    getListOfCampaigns:function(CampaignsList){
        console.log("actions"+CampaignsList);
        AppDispatcher.dispatch({actionType:
            NGOConstants.ListOfCampaigns,
            CampaignsList:CampaignsList});
    }, 
    getListOfSubKampaigns:function(SubCampaignsList){
        console.log("actions"+SubCampaignsList);
        AppDispatcher.dispatch({actionType:
            NGOConstants.ListOfSubCampaigns,
            SubCampaignsList:SubCampaignsList});

    },
    donorslist:function(DonorsList){
    AppDispatcher.dispatch({actionType:
            NGOConstants.NGO_DONORSLIST,
            DonorsList:DonorsList});
    }
};
module.exports = NGOActions;
