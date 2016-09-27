var React = require('react');
var SurveyActions = require('../actions/SurveyQuestionsActions');
var SurveyQuestionsStore = require('../stores/SurveyQuestionsStore');
var base_url = "http://transparency-alpha.elasticbeanstalk.com";

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts.pop().split(";").shift();
  return '';
}
var ajaxRequests = {
  getProposalBriefDetails: function(){
    $.ajax({
        url: base_url+"/transparencyactivitymodule/getProposalBriefDetails/v1/",
      type: "POST",
      data:{
      "data":"'{\"category\":\"6\",\"language\":\"English\",\"offset\":0,\"length\":10}'","clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
      console.log("getProposalBriefDetails",msg);
    });
  },
  getListOfSurveyQuestions: function(){
    $.ajax({
        url: base_url+"/transparencyactivitymodule/getListOfSurveyQuestions/v1/",
      type: "POST",
      data:{
      "data":"'{\"proposalId\":\"13\",\"surveySetId\":\"3\",\"language\":\"English\"}'","clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
      console.log("getListOfSurveyQuestions",msg);
      SurveyActions.receivequestions(msg);
      
    });
  },
  submitUserSurveyResponses: function(SurveyResponsesParameters){
    $.ajax({
        url: base_url+"/transparencyactivitymodule/submitUserSurveyResponses/v1/",
      type: "POST",
      data:{
      "data":"'{\"proposalId\":"+SurveyResponsesParameters.proposalId+",\"surveySetId\":"+SurveyResponsesParameters.surveySetId+",\"questionId\":"+SurveyResponsesParameters.questionId+",\"optionId\":"+SurveyResponsesParameters.optionId+"}'","clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
      console.log("submitUserSurveyResponses", msg);
      ajaxRequests.getListOfSurveyQuestions();
    });
  }
};
module.exports = ajaxRequests;