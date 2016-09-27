var Infinite = require('react-infinite');
var cx = require('react/lib/cx');
var React = require('react');
var ENTER_KEY_CODE = 13;
var TasksActions = require('../actions/TasksActions');
var TasksStore = require('../stores/TasksStore');
var Tasks_Utils = require('../webutils/Tasks_ajax');
var data=[];
var elems = [];
var offset=0;
var length=20;
var TaskForum = React.createClass({
	getInitialState : function(){
    Tasks_Utils.getProfileBriefDetails(offset,length);
		data=TasksStore.getAll();
		return (
			{data:TasksStore.getAll(),task:TasksStore.getQuestion()}
			);
	},
	onSubmit: function(feed){
		TasksActions.create(feed);
	},
	
  componentDidMount: function(){
        TasksStore.addChangeListener(this._onChange);
  },
    componentWillUnmount: function(){
        TasksStore.removeChangeListener(this._onChange);
    },
	_onChange: function(){ 
		this.setState({data: TasksStore.getAll(),task:TasksStore.getQuestion()});
		data=this.state.data;
	},
  render : function(){
    if(this.state.data.length>0){
      return(
        <div><h3>TASK:</h3>
        <h1 className="text-center well">{this.state.task}</h1>
        <AddResponse onFeedSubmit={this.onSubmit}/>
        <h3>Responses:</h3>
        <InfiniteResponsesList />
        </div>
      );
    }
    else{
      return(
        <div className="spinner">
        <img src="img/spinner.gif"/>
        </div>
      );
    }
  }
});


var InfiniteResponsesList = React.createClass({
    getInitialState: function() {
        return {
            elements: this.buildElements(0, length),
            isInfiniteLoading: false,
            height:$(window).height()
        }
    },
   
    updateDimensions:function(){
        this.setState({height:$(window).height()})      
    },
     componentDidMount: function(){
        window.addEventListener('resize', this.updateDimensions);
    },
    commponentWillUnmount: function(){
        window.removeEventListener('resize', this.updateDimensions);
    },
    buildElements: function(start, end) {
       elems=[];   
        data=TasksStore.getAll();     
        console.log("Start", start, "end", end,elems,data);
        var datalen=data.length;
        for (var i = start; i < end && i< datalen; i++) {
            elems.push(<Responses key={i} id={i} num={i}/>);
        }
        console.log("elements",elems);
        return elems;
    },

    handleInfiniteLoad: function() {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        console.log("handleInfiniteLoad");
        offset=offset+length;
        Tasks_Utils.getProfileBriefDetails(offset,length);
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + length);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 1500);
    },

    elementInfiniteLoad: function() {
        return (<div className="spinner">
        <img src="img/spinner.gif"/>
        </div>);
    },

    render: function() {
    	
            
        return(

         <Infinite elementHeight={40}
                         containerHeight={400}
                         infiniteLoadBeginBottomOffset={10}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}                         
                         >
            {this.state.elements}
        </Infinite>);
    }
});


var AddResponse = React.createClass({
	handleSubmit : function(e){
		e.preventDefault();
		var response = React.findDOMNode(this.refs.response).value.trim();
		if(!response)
			{return;}
		React.findDOMNode(this.refs.response).value='';
		this.props.onFeedSubmit({"response": response});
	},
	render : function(){
		return(<div>
			<form className="form-group" onSubmit={this.handleSubmit}>
			<div >
  			<input type="text" className="form-control" ref="response" placeholder="Your answer"/>
			</div>
			<div>
			<input className="btn btn-success pull-right" type="submit"  value="Answer"/></div>
			</form><br/></div>);
	}

});

function getAge(start_date){
  var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var display_age = '';
  var start = new Date(start_date).getTime();
  var end = new Date().getTime();
  var date = new Date(start_date).getDate();
  var month = new Date(start_date).getMonth();
  var year = new Date(start_date).getFullYear();
  var minutes = Math.floor((end-start) / 60 / 1000);
  var hours = Math.floor((end-start) / 3600 / 1000); 
  var days = Math.floor((end-start) / 3600 / 1000 / 24);
  if(days>0){
    if(days==1)
      display_age+=days+" day ago";
    else if(days<4)
      display_age+=days+" days ago";
    else 
      display_age+="on "+months[month]+" "+date+" "+year;
  }
  else {
    if(hours>0){
      if (hours==1)
        display_age+=hours+" hour ago";
      else
        display_age+=hours+" hours ago";
    }
    else {
      if(minutes>0){
        if (minutes==1)
          display_age+=minutes+" min ago";
        else
          display_age+=minutes+" mins ago";
      }
      else {
        display_age+="just now";
      }
    }
  }
  return display_age;
}
var EditableBox = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },
  render: function(){
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
		    onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}/>
    );
  },
  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });

  },
  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

var Responses = React.createClass({
	getInitialState: function() {
			    return (
			      {isEditing: false}
			    );
			  },

	render : function(){
    	var input,loader;
      var time=getAge(data[this.props.num].timestamp);
    	if (this.state.isEditing) {  
    		input = <EditableBox className="edit" onSave={this._onSave} value={data[this.props.num].response} />;
    	}
      else{

        if (data[this.props.num].timestamp===undefined)
            {
            loader= <div className="col-md-2 pull-right"><div className="col-md-12"><img className="pull-right" src="img/gif.gif" style={{"width":"25px"}}/></div></div>
            }
        else
            {time=<div className="pull-right badge">{time}</div>
              loader= <div className="col-md-2"><div className="col-md-12"><img className="pull-right" src="img/tick.png" style={{"width":"25px"}}/></div>{time}</div>
              
            }
        input = <p className="media-heading lead">{data[this.props.num].response}</p>

      }

		return(
			<div className="row rowtask">
				<div className="col-md-12">

						<div className="media-left" ><img className="media-object" src="img/discussion.png" aria-hidden="true" style={{width:"30px"}}/></div>
                
      					<div className="media-body" >
        					<div className="col-md-10" onDoubleClick={this._onDoubleClick}>{input}</div>
                  {loader}
      					</div>

				</div>
			</div>
		);
		},
		_onDoubleClick: function() {
				this.setState({isEditing: true});
        var id=data[this.props.num].responseId;
        console.log("id",id);
      
				},
		_onSave: function(text) {
      var id=data[this.props.num].responseId;
				TasksActions.updateText(this.props.id,data[this.props.num].responseId, text);
				this.setState({isEditing: false});
				},
});
module.exports = TaskForum;
