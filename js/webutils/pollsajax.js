var React = require('react');
var PollsActions = require('../actions/PollsActions');
var PollsStore = require('../stores/PollsStore');
var base_url = "http://transparency-alpha.elasticbeanstalk.com";

console.log("Ajax Calls");
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}

var Requests={

getListOfPollQuestions: function(){

      $.ajax({
        url: base_url+"/transparencyactivitymodule/getProposalBriefDetails/v1/",
      type: "POST",
      data:{
      "data":"'{\"category\":\"6\",\"language\":\"English\",\"offset\":0, \"length\":10}'","clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
       
    })
    .done(function(msg){

      proposal_id = msg[0]["proposalId"];
      pollset_id=msg[0]["pollSetIdsList"][0];
      console.log("Get proposal details", pollset_id,proposal_id, msg);
      $.ajax({
        url: base_url+"/transparencyactivitymodule/getListOfPollQuestions/v1/",
        type: "POST",
        data:{
          "data":"'{\"proposalId\":"+JSON.stringify(proposal_id)+",\"pollSetId\":"+JSON.stringify(pollset_id)+",\"language\":\"English\"}'",
          "clientKeyDetailsId":1
        },
        beforeSend: function(xhr) { 
          xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
        }
      })
      .done(function(msg){
        console.log("Get list of polls from ajax",msg);
        PollsActions.recievedquetions(msg);
        PollsStore.emitChange();
        
      });
    });
    },

    UpdateRequest : function(proposalId,pollSetId,questionId,optionId){
        $.ajax({
       url: base_url+"/transparencyactivitymodule/submitUserPollResponses/v1/",
        type: "POST",
        data:{
          "data":"'{\"proposalId\":"+JSON.stringify(proposalId)+",\"pollSetId\":"+JSON.stringify(pollSetId)+",\"questionId\":"+JSON.stringify(questionId)+",\"optionId\":"+JSON.stringify(optionId)+"}'",
          "clientKeyDetailsId":1
        },
        beforeSend: function(xhr) { 
          xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
        }
      })
      .done(function(msg){
        console.log("After polling list of polls form ajax",msg,"kllgfghjk");
        PollsStore.emitChange();
      });

    }
}
module.exports=Requests;