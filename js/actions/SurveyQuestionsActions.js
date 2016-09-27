var AppDispatcher = require('../dispatcher/AppDispatcher');
var SurveyQuestionsConstants = require('../constants/SurveyQuestionsConstants');

var SurveyQuestionsActions = {
    receivequestions : function(questionslist){
        AppDispatcher.dispatch({actionType:
            SurveyQuestionsConstants.SurveyQuestions_RECRIVEQUESTIONS,
            questionslist:questionslist});
    }
    
};
module.exports = SurveyQuestionsActions;
