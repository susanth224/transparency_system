var React = require('react');
var Infinite = require('react-infinite');
var ReactPropTypes = React.PropTypes;
var NotificationActions = require('../actions/NotificationActions')
var NotificationStore = require('../stores/NotificationStore')
var ServerCalls = require('../webutils/NotificationServerCall')
var click_count=0;
var offset=0;
var length=20;
var data=[];
function toggleNotificationBox(){
    console.log("toggleNotificationBox");
    var menuRight = document.getElementById( 'cbp-spmenu-s2' ),
                showRight = document.getElementById( 'showRight' ),
                showTop = document.getElementById( 'showTop' ),
                body = document.body;

            showRight.onclick = function() {
                
                classie.toggle( this, 'active' );
                classie.toggle( menuRight, 'cbp-spmenu-open' );
                disableOther( 'showRight' );
            };            
            function disableOther( button ) {
                
                if( button !== 'showRight' ) {
                    classie.toggle( showRight, 'disabled' );
                }      
            }
}
var NotificationBox = React.createClass({
	getInitialState : function(){
        ServerCalls.getUnreadRead();
		ServerCalls.getNotifications(offset,length);
        data=NotificationStore.getAll()
		return ({data : NotificationStore.getAll(),unreadCou:NotificationStore.getCount()});
		},
	componentDidMount: function(){
        NotificationStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        NotificationStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
		this.setState({data:NotificationStore.getAll(),unreadCou:NotificationStore.getCount()});
		data=this.state.data;
        console.log("_onChange",data);
	},   
	handleSubmit: function(){
        
		click_count++;
		if(click_count===1) {           
            toggleNotificationBox();
            ServerCalls.getNotifications(offset,length);
            React.render(<InfiniteList/>,document.getElementById("area")); 
        }  
		else click_count=0;	
								
	},
	render : function(){

		return(<div id='showRight' onClick={this.handleSubmit}>
				<span className="badge pull-right">{this.state.unreadCou}</span>
				<span  className="glyphicon glyphicon-bell g_icon pull-right"></span>
			</div>
			);
		}
	});


var text={
    color:"#909090"
};
var tex1={
    color:"black"
};
var elems = [];
var cou=0;
var flag=0;
var ListItem = React.createClass({

    render: function() {
        return (<div className="division adress"  style={ (data[this.props.num].read) ? {"backgroundColor":" #F8F8F8"}:{"backgroundColor":"#E8E8E8 "}}> 
         {data[this.props.num].header}   <br/><small style={text}>{data[this.props.num].time}</small>
        </div>);
    }
});

var InfiniteList = React.createClass({
    getInitialState: function() {
        return {
            elements: this.buildElements(0, 0),
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
       if(cou>0) elems=[];        
        var datalen=data.length;
        for (var i = start; i < end && i< datalen; i++) {
            elems.push(<ListItem key={i} num={i}/>);
        }
        
        return elems;
    },

    handleInfiniteLoad: function() {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        ServerCalls.getNotifications(offset,length);
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + length);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);
    },

    elementInfiniteLoad: function() {
        return (<div className="division" >
                Loding...
            </div>);
    },

    render: function() {
            if(flag === 0){
                elements:this.buildElements(0, length)
                isInfiniteLoading: false ; 
                flag=1;     
            }
            if (this.state.isInfiniteLoading) {cou++};
        return(
         <Infinite  elementHeight={40}
                         containerHeight={570}
                         infiniteLoadBeginBottomOffset={0}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}                         
                         
                         >
            {this.state.elements}
        </Infinite>);
    }
});

module.exports = NotificationBox;
