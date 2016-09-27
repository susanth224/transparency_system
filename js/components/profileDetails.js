var React = require('react');
var MyDonations=require('./MyDonations');
var ProfileDetailsCalls=require('../webutils/profileDetailscalls');
var ProfileDetailsActions = require('../actions/profileDetailsActions');
var ProfileDetailsStore = require('../stores/profileDetailsStore');
var Profile = React.createClass({
	getInitialState : function(){
		ProfileDetailsCalls.getProfileDetails();
		return ({MyProfile:ProfileDetailsStore.getProfileDetails()});
	},
	componentDidMount: function(){
        ProfileDetailsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        ProfileDetailsStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
		this.setState({MyProfile:ProfileDetailsStore.getProfileDetails()});
	},
	render : function(){
		return(
			<div>
				<MyDonations />
				<ProfileDetails myProfile={this.state.MyProfile}/>
			</div>
			);
	}
});
var ProfileDetails = React.createClass({
	render : function(){
		return(
			<div className="row" >
				<div className="col-md-8 col-md-offset-2">
					<h2 className="text-primary text-center">Your Details</h2><br/>
					<table className="table table-responsive table-hover table-condensed donationTable" >
					    <thead>
					        <tr>
					            <th>Title</th>
					            <th>Details</th>
					        </tr>
					    </thead>
					    <tbody>
					        <tr>
					            <td>Name</td>
					            <td>{this.props.myProfile.name}</td>
					        </tr>
					        <tr>
					            <td>Email Id</td>
					            <td>{this.props.myProfile.emailId}</td>
					        </tr>
					        <tr>
					            <td>Primary Number</td>
					            <td>{this.props.myProfile.primaryNumber}</td>
					        </tr>
					        <tr>
					            <td>Device Type</td>
					            <td>{this.props.myProfile.deviceType}</td>
					        </tr>
					        <tr>
					            <td>Gender</td>
					            <td>{this.props.myProfile.gender}</td>
					        </tr>
							<tr>
					            <td>Age</td>
					            <td>{this.props.myProfile.age}</td>
					        </tr>
					        <tr>
					            <td>Interested in</td>
					            <td>{this.props.myProfile.interestedIn}</td>
					        </tr>
					        <tr>
					            <td>College</td>
					            <td>{this.props.myProfile.college}</td>   
					        </tr>
					        <tr>
					            <td>Occupation</td>
					            <td>{this.props.myProfile.presentOccupation}</td>
					        </tr>
					        <tr>
					            <td>Company</td>
					            <td>{this.props.myProfile.company}</td>
					        </tr>
					        <tr>
					            <td>Country</td>
					            <td>{this.props.myProfile.stayingCountry}</td>
					        </tr>
					        <tr>
					            <td>Home Country</td>
					            <td>{this.props.myProfile.homeCountry}</td>
					        </tr>
					        <tr>
					            <td>Home state</td>
					            <td>{this.props.myProfile.homeState}</td>
					        </tr>
					        <tr>
					            <td>Home District</td>
					            <td>{this.props.myProfile.homeDistrict}</td>
					        </tr>
					        <tr>
					            <td>Home Pin</td>
					            <td>{this.props.myProfile.homePIN}</td>
					        </tr>	
					    </tbody>
					</table>
				</div>
			</div>
		);
	}
});
module.exports = Profile;