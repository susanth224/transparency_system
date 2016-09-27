var React = require('react');
var TasksActions = require('../actions/TasksActions');
var TasksStore = require('../stores/TasksStore');
var proposal_id,taskset_id,task_id;
var taskName;
var base_url = "http://transparency-alpha.elasticbeanstalk.com";
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}
var ajaxRequests = {
getProfileBriefDetails:function(offset,length){
  $.ajax({
        url: base_url+"/transparencyactivitymodule/getProposalBriefDetails/v1/",
      type: "POST",
      data:{
      "data":"'{\"category\":\"6\",\"language\":\"English\",\"offset\":0, \"length\":150}'","clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
      proposal_id = msg[0]["proposalId"];
      console.log("Proposal id", proposal_id);
      taskset_id=msg[0]["taskSetIdsList"][0];
      console.log("Task set id",taskset_id);
      ajaxRequests.getListOfTasks(offset,length);
    });
},
getListOfTasks: function(offset,length){
  $.ajax({
          url: base_url+"/transparencyactivitymodule/getListOfTasks/v1/",
          type: "POST",
          data:{
            "data":"'{\"proposalId\":"+JSON.stringify(proposal_id)+",\"taskSetId\":"+JSON.stringify(taskset_id)+", \"language\": \"English\",\"offset\":"+JSON.stringify(offset)+", \"length\":"+JSON.stringify(length)+"}'",
            "clientKeyDetailsId":1
          },
          beforeSend: function(xhr) { 
            xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
          }
        })
        .done(function(msg){
        console.log("Task Questions", msg);
        taskName=msg[0]["taskName"];
        TasksActions.receiveQuestions(taskName);
        task_id=msg[0]["taskId"];
        console.log("task id",task_id);
        ajaxRequests.getTaskResponses();

        console.log("2",taskName);
      });
},
getTaskResponses: function(){
  console.log("in getTaskResponses");
  $.ajax({
              url: base_url+"/transparencyactivitymodule/getTaskResponses/v1/",
              type: "POST",
              data:{
                "data":"'{\"proposalId\":"+JSON.stringify(proposal_id)+",\"taskSetId\":"+JSON.stringify(taskset_id)+",\"taskId\":"+JSON.stringify(task_id)+", \"language\": \"English\",\"offset\":0, \"length\":150}'",
                "clientKeyDetailsId":1
              },
              beforeSend: function(xhr) { 
                xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
              }
            })
            .done(function(msg){
              console.log("Task Responses", msg);
              TasksActions.receiveTasks(msg);
  });
  },

  initiateATask: function(new_discussion){
      $.ajax({
      url: base_url+"/transparencyactivitymodule/submitUserTaskResponses/v1/",
      type: "POST",
      data:{
      "data":"'{\"proposalId\":"+JSON.stringify(proposal_id)+",\"taskSetId\":"+JSON.stringify(taskset_id)+",\"taskId\":"+JSON.stringify(task_id)+", \"response\":"+JSON.stringify(new_discussion["response"])+"}'",
      "clientKeyDetailsId":1
      },
      beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
      console.log("New Task",msg);
     TasksActions.updateTemporaryListCreation(msg);
    });
  },
  updateTaskResponses: function(id,text){
    $.ajax({
      url: base_url+"/transparencyactivitymodule/editTaskResponse/v1/",
      type: "POST",
      data:{
      "data":"'{\"proposalId\":"+JSON.stringify(proposal_id)+",\"taskSetId\":"+JSON.stringify(taskset_id)+",\"taskId\":"+JSON.stringify(task_id)+",\"response\":"+JSON.stringify(text)+",\"responseId\":"+JSON.stringify(id)+"}'",
      "clientKeyDetailsId":1
      },
      beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
      console.log("Edited task", msg);
      TasksActions.updateEditedTask(msg);
    });
  },
};

module.exports = ajaxRequests;