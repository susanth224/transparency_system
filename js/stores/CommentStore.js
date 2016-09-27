var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var ServerCalls = require('../webutils/ajax');
var assign = require('object-assign');
var commentList=[];
var access_token;
var CHANGE_EVENT = 'change';
var tagList=[];
var CommentFliterList=[];
var CommentCategoryList=[];
var CommentCategoryIds=[];
var CommentTagList=[];
var discussionDetails={};
function divideCommentInfo(commentsInfo){
  commentList=commentsInfo.commentList;
  discussionDetails=commentsInfo.discussion;
  tagList=commentsInfo.commentTagsList;
  CommentFliterList=commentsInfo.commentFilterList;
  CommentCategoryList=tagList.map(function(tag, index){
	  CommentTagList[index]=tag.commentTags;
	  CommentCategoryIds[index]=tag.categoryId;
		return(tag.categoryName);
	});
  CommentStore.emitChange();
}
var CommentStore = assign({}, EventEmitter.prototype,{
	 getAll: function(data){
		 return commentList;
    },
    getDiscussion: function(data){
		 return discussionDetails;
    },
	getCommentCategoryList: function(){
		return CommentCategoryList;
	},
	getCommentTagList: function(){
		return CommentTagList;
	},
	getCommentCategoryIds:function(){
		return CommentCategoryIds;
	},
	getCommentFliterList:function(){
		return CommentFliterList;
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
        var comment;
        switch(action.actionType){
			case CommentConstants.COMMENT_NEWCREATE:
                commentList.unshift(action.comment);
				CommentStore.emitChange();
				ServerCalls.createComment(action.comment);
                break;
            case CommentConstants.COMMENT_CREATE:
					commentList.shift();
					commentList.unshift(action.comment);
					CommentStore.emitChange();
                break;
			case CommentConstants.COMMENT_VOTE:
                var identity=action.comment_info.identity;
				var vote=action.comment_info.vote;
				if(vote==="UPVOTE")
				{
					commentList[identity].upVotes=commentList[identity].upVotes+1;
					if(commentList[identity].vote==="DOWNVOTE")
						commentList[identity].downVotes=commentList[identity].downVotes-1;
						
				}
				if(vote==="DOWNVOTE")
				{
					commentList[identity].downVotes=commentList[identity].downVotes+1;
					if(commentList[identity].vote==="UPVOTE")
						commentList[identity].upVotes=commentList[identity].upVotes-1;
				}
				CommentStore.emitChange();
				ServerCalls.voteOnComment(action.comment_info);
                break;
			case CommentConstants.COMMENT_VOTES:
                var identity=action.comment_info.identity;
                commentList[identity]=action.comment_info.msg;
				CommentStore.emitChange();
                break;
			case CommentConstants.COMMENT_REPORT:
                break;
            case CommentConstants.COMMENT_DELETE:
				var proposalId=action.comment_info.proposalId;
                var discussionId=action.comment_info.discussionId;
                ServerCalls.getComments({"proposalId":proposalId,"discussionId":discussionId});
                break
			case CommentConstants.COMMENT_DELETES:
                var identity=action.comment_info.identity;
				commentList.splice(identity,1);
				console.log("deleteing...",commentList);
				CommentStore.emitChange();
				ServerCalls.deleteComment(action.comment_info);
                break;
            case CommentConstants.COMMENT_GETALL:
					divideCommentInfo(action.comments_info);
                break;
            default:
        }
    })
});
module.exports = CommentStore;
