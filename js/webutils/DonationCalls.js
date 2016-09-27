var React = require('react');
var DonationActions = require('../actions/DonationActions');
var DonationsStore = require('../stores/DonationsStore');
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}
var ajaxRequests = {
getListOfDonations: function(){
  $.ajax({
    url: "http://transparency-alpha.elasticbeanstalk.com/transparencydonations/getListOfDonations/v1/",
    type: "POST",
    data:{
      "data":"'{\"offset\": 0,\"length\": 1000}'","clientKeyDetailsId":1
    },
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
    },
    async: true
  })
  .done(function(msg){
    console.log("msg donations list",msg);
    DonationActions.getAllDonations(msg);
  })
  .fail(function(msg){
      alert("Donations not Found");
    });
  },
  SearchDonation: function(Search){
  $.ajax({
    url: "http://transparency-alpha.elasticbeanstalk.com/transparencydonations/searchDonation/v1/",
    type: "POST",
    data:{
      "data":"'{\"offset\": 0,\"length\": 1000,\"searchBy\" : "+JSON.stringify(Search.searchBy)+",\"searchValue\" : "+JSON.stringify(Search.searchValue)+"}'","clientKeyDetailsId":1
    },
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
    },
    async: true
  })
  .done(function(msg){
    console.log("msg donations search",msg);
    DonationActions.getAllDonations(msg);
  })
  .fail(function(msg){
      alert("search not Found");
    });
  },
  SearchDonationByDateTime: function(Search){
  $.ajax({
    url: "http://transparency-alpha.elasticbeanstalk.com/transparencydonations/searchDonation/v1/",
    type: "POST",
    data:{
      "data":"'{\"offset\": 0,\"length\": 1000,\"searchBy\" : "+JSON.stringify(Search.searchBy)+",\"fromDateTime\" : "+JSON.stringify(Search.fromDateTime)+",\"toDateTime\" : "+JSON.stringify(Search.toDateTime)+"}'","clientKeyDetailsId":1
    },
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
    },
    async: true
  })
  .done(function(msg){
    console.log("SearchDonationByDateTime",msg);
    DonationActions.getAllDonations(msg);
  })
  .fail(function(msg){
      alert("search not Found");
    });
  },
  getListOfBillsForDonation: function(donationId){
  $.ajax({
    url: "http://transparency-alpha.elasticbeanstalk.com/transparencydonations/getListOfBillsForDonation/v1/",
    type: "POST",
    data:{
      "data":"'{\"donationId\": \"A879073E\"}'","clientKeyDetailsId":1
    },
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
    }
  })
  .done(function(msg){
    console.log("	msg donations bils",msg);
	DonationActions.getAllDonationsBills(msg);
  })
  .fail(function(msg){
      DonationActions.getAllDonationsBills([{"description": "Vegetable Bills description","header": "Vegetable Bills","proposalId": "13"},{"description": "Vegetable Bills description","header": "Vegetable Bills","proposalId": "14"},{"description": "Vegetable Bills description","header": "Vegetable Bills","proposalId": "15"}]);
    });
  }
};

module.exports = ajaxRequests;
