var AppDispatcher = require('../dispatcher/AppDispatcher');
var TasksConstants = require('../constants/TasksConstants');
 
var TasksActions = {
    create: function(new_task){
        AppDispatcher.dispatch({actionType: 
            TasksConstants.TASKS_CREATE,
         new_task:new_task});
    },

    updateTemporaryListCreation: function(new_task){
      console.log("here");
        AppDispatcher.dispatch({actionType: 
            TasksConstants.TASKS_UPDATE,
         new_task:new_task});
    },
    updateEditedTask: function(newTaskEdit){
      console.log("here");
        AppDispatcher.dispatch({actionType: 
            TasksConstants.TASKS_UPDATE_EDITED_TEXT,
         newTaskEdit:newTaskEdit});
    },

    updateText: function(id,responseId, response) {
    AppDispatcher.dispatch({
      actionType: TasksConstants.TASKS_UPDATE_TEXT,
      objectId: id,
      responseId: responseId,
      response: response
    });
  },
    receiveTasks : function(taskslist){
    AppDispatcher.dispatch({
      actionType:
            TasksConstants.TASKS_RECEIVETASKS,
            taskslist:taskslist});
    },
    receiveQuestions : function(tasks){
    AppDispatcher.dispatch({
      actionType:
            TasksConstants.TASKS_RECEIVEQUESTIONS,
            tasks:tasks});
    
    }
    
};
module.exports = TasksActions;
