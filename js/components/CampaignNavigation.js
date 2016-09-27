var React = require('react');
var Navigationpill = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function(index){
        this.setState({focused: index});
    },

    render: function() {
        var self = this;
        var hash = this.props.hashes ? this.props.hashes : this.props.items;
        return (<div>
        <nav className="navbar navbar-default transparencyNavbar">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
      
          <div className="collapse navbar-collapse" id="navbar-collapse-2">
            <ul className="nav nav-pills nav-justified transparencyNav-pills">
              { this.props.items.map(function(navname, index){
                  var style = '';
                  if(self.state.focused == index){
                    style = 'active';
                  }
                  return <li className={style} key={index} onClick={self.clicked.bind(self, index)}><a className="btn btn-outline btn-circle collapsed" href={"#"+hash[index]}>{navname}</a></li>;
                  })
              }
            </ul>
          </div>
        </div>
      </nav>

       </div>      
        );
    }
});

var CampaignNavigation = React.createClass({
    render:function(){
    //window.location.href="#/campaigns";
      return(      

            <div className="row1">
              <div>
              <Navigationpill
                 items={ ['About', 'Subevents' ,'Activity'] } 
                hashes={ ['campaigns/about', 'campaigns/subevents', 'campaigns/activity'] } />
              </div>
            </div>    
        );

    }
});

module.exports = CampaignNavigation;  