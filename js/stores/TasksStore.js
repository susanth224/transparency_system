var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TasksConstants = require('../constants/TasksConstants');
var Utils = require('../webutils/Tasks_ajax');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var taskList=[];
var tasks;
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}

function create(new_task){
    console.log("diss before",taskList);
  taskList.unshift({"id":0, "response": new_task["response"],"responseId":0});
    console.log("diss after",taskList);
    TasksStore.emitChange();
  Utils.initiateATask(new_task);
  
}

function taketaskslist(tasks){
  taskList=taskList.concat(tasks);
  console.log("TaskList",taskList);
  TasksStore.emitChange();
}

function takequestions(taskquestions){
  tasks=taskquestions;
  console.log("TaskQuestion",tasks);
  TasksStore.emitChange();
}
var temp_id;
function update(id,responseId, response){
    temp_id=id;
    console.log("temp_id",temp_id);
    console.log("id",id);
    console.log("respId",responseId);
    console.log("before",taskList);
    console.log("before",taskList[id]["response"]);
    taskList[id]["response"]=response;
    
    taskList[id]["timestamp"]=undefined;
     console.log("after",taskList[id]["response"]);
    Utils.updateTaskResponses(responseId,response);
    TasksStore.emitChange();
}
var TasksStore = assign({}, EventEmitter.prototype,{
    getAll: function(){
          return taskList;
    },
    getQuestion: function(){
        return tasks;
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
            case TasksConstants.TASKS_CREATE:
                if(action.new_task !== ''){
                    create(action.new_task);
                }
                break;
            case TasksConstants.TASKS_RECEIVETASKS:
                if(action.taskslist !== ''){
                    taketaskslist(action.taskslist);
                }
                break;
            case TasksConstants.TASKS_RECEIVEQUESTIONS:
                if(action.tasks !== ''){
                    takequestions(action.tasks);
                }
                break;
            case TasksConstants.TASKS_UPDATE:
                taskList.shift();
                taskList.unshift(action.new_task);
                console.log("updated",taskList);
                TasksStore.emitChange();
                break;

            case TasksConstants.TASKS_UPDATE_EDITED_TEXT:
                taskList[temp_id]=action.newTaskEdit;
                console.log("updated",taskList);
                TasksStore.emitChange();
                break;

            case TasksConstants.TASKS_UPDATE_TEXT:
                if (action.objectId !=='' && action.responseId !=='' && action.response !==''){
                    update(action.objectId,action.responseId,action.response);
                }
                break;
            default:
        }
    })
});
module.exports = TasksStore;
