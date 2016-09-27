var AppDispatcher = require('../dispatcher/AppDispatcher');
var PollsConstants = require('../constants/PollsConstants');

var PollsActions = {
    recievedquetions : function(PollsQuestions){
        AppDispatcher.dispatch({actionType:
            PollsConstants.POLLS_RECIEVEDQUESTIONS,
        PollsQuestions:PollsQuestions});
    },
    
};
module.exports = PollsActions;
