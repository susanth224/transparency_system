var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DiscussionsConstants = require('../constants/DiscussionsConstants');
var Utils = require('../webutils/ajax');
var assign = require('object-assign');
 var categoryList=[];
var CHANGE_EVENT = 'change';
var discussionList=[];
var tagList=[];
var tags=[];
var categoryIds=[];
var discussionFliterList=[];
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}

function create(newDiscussion){
  Utils.initiateDiscussion(newDiscussion);
}
function takeDiscussionsList(discussions){
  discussionList=discussions.discussionList;
  tagList=discussions.discussionTagsList;
  discussionFliterList=discussions.discussionFilterList;
  categoryList=tagList.map(function(tag, index){
	  tags[index]=tag.discussionTags;
	  categoryIds[index]=tag.categoryId;
	  var str="hi";
		return(tag.categoryName);
	});
  DiscussionsStore.emitChange();
}
function upvote(data){
  Utils.upVoting(data);
}
function downvote(data){
  Utils.downVoting(data);
}
var DiscussionsStore = assign({}, EventEmitter.prototype,{
    getAll: function(){
          return discussionList;
    },
	getCategoryList: function(){
		return categoryList;
	},
	getTagList: function(){
		console.log(tags);
		return tags;
	},
	getCategoryIds:function(){
		return categoryIds;
	},
	getDiscussionFliterList(){
		return discussionFliterList;
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
            case DiscussionsConstants.DISCUSSIONS_CREATE:
                if(action.newDiscussion !== '')
				{
					discussionList.unshift(action.newDiscussion);
					DiscussionsStore.emitChange();
                    create(action.newDiscussion);
                }
                break;
			case DiscussionsConstants.DISCUSSIONS_NEWCREATE:
					discussionList.shift();
					discussionList.unshift(action.newDiscussion);
					DiscussionsStore.emitChange();
                break;
            case DiscussionsConstants.DISCUSSIONS_RECRIVEDISCUSSIONS:
                if(action.discussionslist !== ''){
                    takeDiscussionsList(action.discussionslist);
                }
                break;
            case DiscussionsConstants.DISCUSSIONS_UPVOTE:
                if(action.data.id !==''){
					discussionList[action.data.identity].upVotes=discussionList[action.data.identity].upVotes+1;
					if(discussionList[action.data.identity].vote==="DOWNVOTE")
						discussionList[action.data.identity].downVotes=discussionList[action.data.identity].downVotes-1;
					DiscussionsStore.emitChange();
                    upvote(action.data);
                }
                break;
			case DiscussionsConstants.DISCUSSIONS_NEWUPVOTE:
                  discussionList[action.data.identity]=action.data.msg; 
					DiscussionsStore.emitChange();
                break;
            case DiscussionsConstants.DISCUSSIONS_DOWNVOTE:
                if(action.data.data !==''){
					discussionList[action.data.identity].downVotes=discussionList[action.data.identity].downVotes+1;
					if(discussionList[action.data.identity].vote==="UPVOTE")
						discussionList[action.data.identity].upVotes=discussionList[action.data.identity].upVotes-1;
					DiscussionsStore.emitChange();
                    downvote(action.data);
                }
                break;
			case DiscussionsConstants.DISCUSSIONS_NEWDOWNVOTE:
					console.log("hi",action.data.msg,action.data.identity);
                  discussionList[action.data.identity]=action.data.msg;
				  
					console.log("hi",action.data.msg,action.data.identity);
					DiscussionsStore.emitChange();
                break;
            default:
        }
    })
});
module.exports = DiscussionsStore;
