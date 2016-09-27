var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiscussionsConstants = require('../constants/DiscussionsConstants');

var DiscussionsActions = {
    newCreate:function(newDiscussion)
    {
        AppDispatcher.dispatch({actionType: 
            DiscussionsConstants.DISCUSSIONS_NEWCREATE,
         newDiscussion:newDiscussion});
    },
    createDiscussion: function(newDiscussion){
        AppDispatcher.dispatch({actionType: 
            DiscussionsConstants.DISCUSSIONS_CREATE,
         newDiscussion:newDiscussion});
    },
    discussionUpVote : function(data){
        AppDispatcher.dispatch({actionType:
            DiscussionsConstants.DISCUSSIONS_UPVOTE,
            data:data});
    },
    newupvote : function(data){
        console.log(data);
        AppDispatcher.dispatch({actionType:
            DiscussionsConstants.DISCUSSIONS_NEWUPVOTE,
            data:data});
    },
    discussionDownVote : function(data){
        AppDispatcher.dispatch({actionType:
            DiscussionsConstants.DISCUSSIONS_DOWNVOTE,
            data:data});
    },
    newdownvote : function(data){
        console.log(data);
        AppDispatcher.dispatch({actionType:
            DiscussionsConstants.DISCUSSIONS_NEWDOWNVOTE,
            data:data});
    },
    receiveDiscussions : function(discussionslist){
        AppDispatcher.dispatch({actionType:
            DiscussionsConstants.DISCUSSIONS_RECRIVEDISCUSSIONS,
            discussionslist:discussionslist});
    }
    
};
module.exports = DiscussionsActions;
