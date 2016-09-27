var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PollsConstants = require('../constants/PollsConstants');
var assign = require('object-assign');
var proposal_id;
var pollset_id;
var CHANGE_EVENT = 'change';
var discussionList=[];

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}
function TakeQuestionsList(Questions){
  QuestionsList=Questions;
  PollsStore.emitChange();
}

var PollsStore = assign({}, EventEmitter.prototype,{
    getAll: function(){
          return QuestionsList;
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

           case PollsConstants.POLLS_RECIEVEDQUESTIONS:
                if(action.PollsQuestions !== ''){
                    TakeQuestionsList(action.PollsQuestions);
                }
                break;
            default:
        }
    })
});
module.exports = PollsStore;
