var React = require('react');

var BillComponent = React.createClass({
	componentDidMount: function(){
		
	},
	render:function(){
		return(<iframe src="http://localhost/transparency/bills?billId=6"></iframe>);
	}
});	

module.exports = BillComponent;