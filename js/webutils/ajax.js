var React = require('react');
var DiscussionsActions = require('../actions/DiscussionsActions');
var CommentActions = require('../actions/CommentActions');
var DiscussionsStore = require('../stores/DiscussionsStore');
var proposalId;
var base_url = "http://transparency-alpha.elasticbeanstalk.com";


function getproposalid(){
  var a=document.cookie.split(";");
  for(var i=0;i<a.length;i=i+1){
      b=a[i].split("=")
      if(b[0].trim()=="proposalId"){
        proposalId=b[1].trim();
        return proposalId;
      }
  } 
}

function getCookie(name){

    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';
}

var ajaxRequests = {

  getCookie: function(name){
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';
  },
  getProposalId: function(){
  var a=document.cookie.split(";");
  for(var i=0;i<a.length;i=i+1){
      b=a[i].split("=")
      if(b[0].trim()=="proposalId"){
        proposalId=b[1].trim();
        return proposalId;
      }
  } 
  },
  genericWebAPICall: function(url, requestObject, onSuccess, onFailure){
      var formattedrequestObject = JSON.stringify(JSON.stringify(requestObject)); 
      var dataRequestObject = {"data":formattedrequestObject,"clientKeyDetailsId":1};
      console.log(dataRequestObject);
      $.ajax({
      url: base_url+url,
      type: "POST", 
      data: dataRequestObject,
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
      })
      .done(onSuccess)
      .fail(onFailure);
  },
  getListOfDiscussions: function(filter){
  getproposalid();
  console.log("pid",proposalId);
  $.ajax({
    url: base_url+"/transparencyactivitymodule/getDiscussionAndComments/v1/",
    type: "POST",
    data:{
      "data":"'{\"proposalId\":'"+JSON.stringify(proposalId)+"',\"filterBy\":"+JSON.stringify(filter)+"}'","clientKeyDetailsId":1
    },
    beforeSend: function(xhr) { 
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
    },
    async: true
  })
  .done(function(msg){

    console.log("Discussion list",msg);
    DiscussionsActions.receiveDiscussions(msg);
  });
  },
  createComment: function(comment_info)
  {
    var cookies=document.cookie;
    var access_token=cookies.split('=')[1];
    console.log("acess_token",access_token);
    var comment=JSON.stringify(comment_info.comment);
    var commentTag=JSON.stringify(comment_info.commentTag);
    var discussionId=JSON.stringify(comment_info.discussionId);
    console.log(comment,"this",discussionId);
    $.ajax({
        url: base_url+"/transparencyactivitymodule/commentOnADiscussion/v1/",
        type: "POST",
        data:{
        "data":"'{\"comment\":"+comment+",\"commentTags\":"+JSON.stringify(comment_info.tags)+",\"discussionId\":"+discussionId+"}'",
        "clientKeyDetailsId":1
        },
        beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
        }
      })
      .done(function(msg){
        console.log("Comment on a discussion", msg);
        CommentActions.create(msg);
        })
      
      .fail(function(msg){
        console.log("failed to create");
    });
    
  },
  voteOnComment: function(data)
  {
    var cookies=document.cookie;
    var access_token=cookies.split('=')[1];
    var vote=JSON.stringify(data.vote);
    var discussionId=JSON.stringify(data.discussionId);
    var commentId=JSON.stringify(data.commentId);
    $.ajax({
        url: base_url+"/transparencyactivitymodule/upOrDownVoteAComment/v1/",
        type: "POST",
        data:{
        "data":"'{\"vote\":"+vote+",\"discussionId\":"+discussionId+", \"commentId\": "+commentId+"}'",
        "clientKeyDetailsId":1
        },
        beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
        }
      })
      .done(function(msg){
        console.log("Upvote or downvote a comment", msg);
        CommentActions.Vote({"msg":msg,"identity":data.identity});
      })
      .fail(function(msg){
        console.log("failed to take change votes");
      });
      
  },
  deleteComment: function(data){
    var cookies=document.cookie;
    var access_token=cookies.split('=')[1];
    console.log("cmntid",data.commentId);
    var commentId=JSON.stringify(data.commentId);
    console.log("hi",commentId);
    $.ajax({
        url: base_url+"/transparencyactivitymodule/deleteComment/v1/",
        type: "POST",
        data:{
        "data":"'{\"commentId\": "+commentId+"}'",
        "clientKeyDetailsId":1
        },
        beforeSend: function(xhr) { 
          xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
        }
      })
      .done(function(){
        console.log("Deleted comment");
        CommentActions.Delete(data);
      })
      .fail(function(msg){
        console.log("failed to Delete",msg);
      });   
  },
  reportOnComment: function(data)
  {
    var cookies=document.cookie;
    var access_token=cookies.split('=')[1];
    var discussionId=JSON.stringify(data.discussionId);
    var commentId=JSON.stringify(data.commentId);
    console.log("hi",discussionId,commentId);
    $.ajax({
        url: base_url+"/transparencyactivitymodule/reportAComment/v1/",
        type: "POST",
        data:{
        "data":"'{\"discussionId\":"+discussionId+", \"commentId\": "+commentId+"}'",
        "clientKeyDetailsId":1
        },
        beforeSend: function(xhr) { 
          xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
        }
      })
      .done(function(){
        console.log("Report inappropriate");
        CommentActions.Report(data);
      })
      .fail(function(msg){
        console.log("failed to Report");
      });
      
  },
  initiateDiscussion: function(new_discussion){
    console.log("here i am",new_discussion.discussionTags);
      $.ajax({
        url: base_url+"/transparencyactivitymodule/initiateADiscussion/v1/",
      type: "POST",
      data:{
      "data":"'{\"name\":"+JSON.stringify(new_discussion.name)+",\"discussionTags\":"+JSON.stringify(new_discussion.tags)+",\"proposalId\":'"+JSON.stringify(proposalId)+"'}'","clientKeyDetailsId":1
      },
      async: true,
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
    console.log("Done",msg);
      //ajaxRequests.getlistofdiscussions();
    
    DiscussionsActions.newCreate(msg);
    });
  },
  upVoting: function(data){
    $.ajax({
      url: base_url+"/transparencyactivitymodule/upOrDownVoteADiscussion/v1/",
      type: "POST",
      data:{
        "data":"'{\"vote\":\"UPVOTE\",\"discussionId\":"+JSON.stringify(data.id)+"}'",
        "clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      },
      async: true
    })
    .done(function(msg){
    console.log(msg,data.identity);
    DiscussionsActions.newupvote({"msg":msg,"identity":data.identity});
      //ajaxRequests.getlistofdiscussions();
    });
  },
  downVoting: function(data){
    $.ajax({
      url: base_url+"/transparencyactivitymodule/upOrDownVoteADiscussion/v1/",
      type: "POST",
      data:{
        "data":"'{\"vote\":\"DOWNVOTE\",\"discussionId\":"+JSON.stringify(data.id)+"}'",
        "clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      },
      async: true
    })
    .done(function(msg){
    console.log(msg,data.identity);
    DiscussionsActions.newdownvote({"msg":msg,"identity":data.identity});
      //ajaxRequests.getlistofdiscussions();
    });
  },
  getComments: function(filter){
    var discussionData=JSON.parse(getCookie("Discussion"));
    var proposalId=getproposalid();
    $.ajax({
        url: base_url+"/transparencyactivitymodule/getListOfCommentsNew/v1/",
      type: "POST",
      data:{
      "data":"'{\"proposalId\":"+JSON.stringify(proposalId)+",\"discussionId\":"+JSON.stringify(discussionData.discussionId)+",\"filterBy\":"+JSON.stringify(filter)+"}'",
      "clientKeyDetailsId":1
      },
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(msg){
      console.log("Get list of comments", msg);
      //all_comments=msg.commentList;
      CommentActions.getAllComments(msg);
    })
    .fail(function(msg){
      console.log("failed to take data");
    });
  }
};

module.exports = ajaxRequests;