
var React = require('react');
var Router = require('react-router');

var Route=Router.Route;
var NotFoundRoute=Router.NotFoundRoute;
var DefaultRoute=Router.DefaultRoute;

var LoginBox = require('./components/LoginBox');
var NavigationBar = require('./components/NavigationBar');
var SubNavigation = require('./components/Navigationpill');
var ListOfDonors = require('./components/ListOfDonors');
var NGOHome = require('./components/NGOHome');
var Monitery = require('./components/Monitery');
var webAPIUtils = require('./webutils/Webutils');
var DiscussionForum = require('./components/DiscussionForum.react');
var CommentBox = require('./components/CommentBox.react');
var NGOSubCampaign=require('./components/NGOSubCampaign');
var Polls = require ('./components/Polls.react');
var CampaignNavigation =require('./components/CampaignNavigation');
var BillComponent = require('./components/BillComponent.react');
var StockBookComponent = require('./components/StockBookComponent.react');
var FAQcomponent = require('./components/FAQcomponent');
var SubcampaignsAbout = require('./components/SubcampaignsAbout');
var DonationsBills=require('./components/DonationsBills');

var DonationBox=require('./components/DonationBox');
var Profile=require('./components/profileDetails');


var PageNavigation = React.createClass({
    render:function(){
      return(   
    
            <div className="row1">
              <div className="col-md-12">
              <NavigationBar
                             items={ ['Home', 'Transparency', 'Donations', 'Profile','About' ,'FAQ\'s'] } 
                             hashes={ ['home', 'transperancy', 'donations','profile','about','faq'] } />
              
              </div>
            </div> 
        );

    }
});

var About = React.createClass({
    render:function(){
      return(   
        <div>
            	<SubcampaignsAbout/> 
          </div>    
        );

    }
});
var About1 = React.createClass({
    render:function(){
      return(   
        <div>
          <Subcampaigns/> 
            <SubcampaignsAbout/>
          </div>    
        );

    }
});
var Transperancy = React.createClass({
    render:function(){
    window.location="#/transperancy/vr1caps";
      return(   
          <SubNavigation focusIndex="0" />  
        );
    }
});
var Policies = React.createClass({
    render:function(){
      return(   
          <SubNavigation focusIndex="1" />  

        );

    }
});

var Subcampaigns = React.createClass({
    render:function(){
      return(   
  
          <CampaignNavigation/>  

        );

    }
});
var RouteHandler = Router.RouteHandler;
var App = React.createClass({
  render: function() {
    return (
      <div>  
        <RouteHandler/>
      </div>
    )
  }
});
var routes = (
  <Route handler={App}>
    <Route path="/" handler={LoginBox}/>
    <Route path="home" handler={NGOHome}/>
    <Route path="about" handler={About}/>
    <Route path="bills" handler={BillComponent}/>
    <Route path="stockbooks" handler={StockBookComponent}/>
    <Route path="transperancy" handler={Transperancy}/>
    <Route path="transperancy/vr1caps" handler={Monitery}/>
    <Route path="transperancy/donors" handler={ListOfDonors}/>
    <Route path="transperancy/vr1caps/:proposalId/discussions" handler={Monitery} />		
    <Route path="vr1caps/discussion/:discussionId/commentbox" handler={CommentBox}/>
    
    <Route path="transperancy/policies" handler={Policies} />
    <Route path="campaigns/subevents" handler={NGOSubCampaign}/>
    <Route path="campaigns/about" handler={About1}/>
    <Route path="transperancy/vr1caps/Polls" handler={Monitery} />
    <Route path="transperancy/vr1caps/Task" handler={Monitery} />
    <Route path="transperancy/vr1caps/Surveys" handler={Monitery} />
    <Route path="donations" handler={DonationBox}/>
    <Route path="profile" handler={Profile}/>
    <Route path="faq" handler={FAQcomponent}/>
	
    <Route path="donationsbills" handler={DonationsBills}/>
  </Route>
);
Router.run(routes, function (Handler) {
    React.render(<div>
      <PageNavigation/>
      <div style={{"marginTop":"5%"}}><Handler/></div></div>, document.getElementById('reactrouterdemo'));
});