var React = require('react');
var NotificationBox=require("./NotificationBox");
var NavigationBar = React.createClass({

    getInitialState: function(){
        return { focused: -1 };
    },
  
    clicked: function(index){
        this.setState({focused: index});
    },
   
    clearcookie: function(){
    	console.log("I am called to clear cookie");
   		console.log(document.cookie);
    	var cookies = document.cookie.split(";");

  	  for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    console.log("OOops deleted loging agian .... :-("+document.cookie);
    },
    render: function() {

        var self = this;
        var hash = this.props.hashes ? this.props.hashes : this.props.items;
        return (

            <nav className="navbar navbar-inverse navbar-fixed-top homeNavbar">
     			
				 <div className="container">
        			<div className="navbar-header">
					 <a  href="#"><img className="img img-responsive logo" src="img/vr1.jpg"/></a>
         		 <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">
            	<span className="sr-only">Toggle navigation</span>
            	<span className="icon-bar"></span>
            	<span className="icon-bar"></span>
            	<span className="icon-bar"></span>
          		</button>
         
      	  </div>
        	<div className="collapse navbar-collapse" id="navbar-collapse-2">
          	<ul className="nav navbar-nav navbar-right">
            { this.props.items.map(function(navname, index){
                      var style = '';
                      if(self.state.focused == index){
                          style = 'focused';
                      }
                      return <li className={style} key={index} onClick={self.clicked.bind(self, index)}><a href={"#"+hash[index]}>{navname}</a></li>;
                      }) }
            <li  id="NotificationIcon">
               <div id="Show_Right"></div>
            </li>
            <li id="logout" style={{"display":"none"}} >
              <a className="btn btn-default btn-outline btn-circle"  href="#" onClick={this.clearcookie}>Logout</a>
            </li>
            
          </ul>
          </div>
        </div>
    </nav>
        );
    }
});

module.exports = NavigationBar;


   