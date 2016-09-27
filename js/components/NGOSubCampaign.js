var React = require('react');
var Infinite = require('react-infinite');

var CampaignNavigation =require('../components/CampaignNavigation');
var NGODetailsStore = require('../stores/NGODetailsStore')
var webAPIUtils = require('../webutils/Webutils');
var data=[];
var offset=0;
var length=10;
var goal;
var funded=0;
var days_left;
var NGOSubCampaignCard = React.createClass({
	render : function(){
		return(
<div className="col-md-3 col-lg-3 col-sm-5 col-xs-12 col-lg-offset-2 subevent-card"> 
    <img className="img img-responsive img-center" style={{height:"150px",width:"300px"}} src="images/carosel/subevents.jpg" alt="NGO Logo">
    <br/>
    </img>
    <div className="subevent-description">
    <div>
    <strong>{this.props.subcampaign.subKampaignerName}</strong></div>
    <div>
    {this.props.subcampaign.title}
    </div>
    </div>
    <table className="table table-bordered" cellPadding="10">
        <tr>
            <td>
            <strong><span className="count">{this.props.subcampaign.pledgedQuantity}</span><br/>
            <span>Pledged</span>
            </strong>
            </td>
            <td>
            <strong><span className="count">{this.props.subcampaign.fulfilledQuantity}</span>
            <br/>
            <span>Fulfilled</span>
            </strong>
            </td>
        </tr>
    </table>
</div>
);

		}
	});
var Sidebar = React.createClass({
    render : function(){
        funded=NGODetailsStore.getFundedDetails();
        return(
            <div className="campaign-sidebar">
            <div className="col-md-12 pull-left">
                <div className="campaign-amount">${funded}</div>
                <div className="campaign-descriptor"><strong>funded</strong></div>
            </div>
            <div className="col-md-12 pull-left">
                <div className="campaign-amount">${goal}</div>
                <div className="campaign-descriptor"><strong>goal</strong></div>
            </div>
            <div className="col-md-12 pull-left">
                <div className="campaign-amount">{days_left}</div>
                <div className="campaign-descriptor"><strong>days left</strong></div>
            </div>
            </div>
        );}
});
var NGOSubCampaign = React.createClass({
    getInitialState : function(){
        webAPIUtils.getListOfSubKampaigns(offset,length);
		window.addEventListener("scroll", this.handleScroll);

		 data=NGODetailsStore.getSubCampaignsList();
		 goal=NGODetailsStore.getGoals();
         days_left=NGODetailsStore.getDaysLeft();
       
        return ({subcampaigns : NGODetailsStore.getSubCampaignsList()});

        },
    componentDidMount: function(){
        NGODetailsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        NGODetailsStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({subcampaigns : NGODetailsStore.getSubCampaignsList()});
        data=this.state.subcampaigns;
    },
    handleScroll:function(e){
      var windowHeight = $(window).height();
      var inHeight = window.innerHeight;
      var scrollT = $(window).scrollTop();
      var totalScrolled = scrollT+inHeight;
      if(totalScrolled+1>windowHeight){ 
        if(!this.state.isloading){ 
        this.setState({
        isloading:true,
        });
        this.getComment();
      }
      }
    },
    getComment:function(){
      offset = offset+length; 
      webAPIUtils.getListOfSubKampaigns(offset,length);  
      this.setState({
      isloading:false,
      });
      },
    
	render : function(){
        if(this.state.subcampaigns.length>0){
        var Nodes = this.state.subcampaigns.map(function(subcampaign, index){
            return (
                <NGOSubCampaignCard subcampaign={subcampaign}/>);
            });
        return(
            <div>
                <div className="col-md-9">
                        {Nodes}
                </div> 
                <div className="col-md-3">
                    <Sidebar/>
                </div>
            </div>);

      }
    
    else{
      return(
      <div className="col-md-2 col-md-offset-5 center" style={{'marginTop':"5%"}}>
                <img src="images/Loading.gif"/>
                </div>);
    }
    }    

	});

module.exports = NGOSubCampaign;

//React.render(<NGOHome />, document.getElementById('NGOHome'));
