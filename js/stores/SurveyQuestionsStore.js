var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SurveyQuestionsConstants = require('../constants/SurveyQuestionsConstants');
var Utils = require('../webutils/Surveyajax');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var questionsList=[];

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}
function takequestionslist(questions){
 console.log("takequestionslist");
  questionsList=questions;
  SurveyQuestionsStore.emitChange();
}
var SurveyQuestionsStore = assign({}, EventEmitter.prototype,{
    getAll: function(){
           console.log("get all in store",questionsList);
          return questionsList;
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
            case SurveyQuestionsConstants.SurveyQuestions_RECRIVEQUESTIONS:
                if(action.questionslist !== ''){
                    takequestionslist(action.questionslist);
                    console.log("i am survye store");
                    SurveyQuestionsStore.emitChange();
                }
                break;
            default:
        }
    })
});
module.exports = SurveyQuestionsStore;
