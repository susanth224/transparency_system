
var React = require('react');
var NGODetailsStore = require('../stores/NGODetailsStore');
var webAPIUtils = require('../webutils/Webutils');
var SubNavigation = require('./Navigationpill');


var ListOfDonors=React.createClass({
    getInitialState : function(){
        webAPIUtils.getDonorsList();
        return ({DonorCards : NGODetailsStore.getDonorsList()});
        },
    componentDidMount: function(){
        NGODetailsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        NGODetailsStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({DonorCards: NGODetailsStore.getDonorsList()});
        console.log("iam on change",this.state.DonorCards);
    },
   
    render:function(){
            return(
                <div>
                <SubNavigation focusIndex="2"/>
                <div className="row">
                <div className="col-md-6 col-md-offset-2">
                <div className="text-left text-primary" >
                		<h3>List Of Donors </h3>
                </div>
                <table className="table table-bordered table-striped table-responsive text-center">
                	<thead>
                		<tr >
                			<td><strong>Name</strong></td>
                			<td><strong>Amount</strong></td>
                			<td><strong>Donated Date</strong></td>
                		</tr>
                	</thead>
                	<tbody>
                     {this.state.DonorCards.map(function(card,index){
                            return (
                                <div>
                                <Donor List={card}/>
                                </div>
                                );
                        } 
                    )}
                        </tbody>
                	</table>
                	</div>
                </div>                
            </div>
            );      
        }    
});
var Donor = React.createClass({
	render : function(){
		return(
			<tr>
               <td>{this.props.List.Name}</td>
               <td>{this.props.List.Amount}</td>
               <td>{this.props.List.date}</td>
            </tr>
            );
	}
});

module.exports=ListOfDonors;
