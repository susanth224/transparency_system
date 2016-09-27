var React = require('react');
var StarRating = React.createClass({
  render: function() {
    var items = [];
    var rate=this.props.value;
    if(rate<0){ // This if condition for convert option id to makeing rating value...
      rate=0;
    }
    else{
      if(rate>32)
        rate-=32;
      else
        rate-=11;
    }
    for (var i = this.props.max; i >=1 ; i--) {
      var clickHandler1 = this.props.onRatingSelected && this.props.onRatingSelected.bind(null, i);
      items.push(<input type="radio" id={"rating"+i} key={i} name={"rating"+this.props.id} checked = {i == rate && 'checked'}><label htmlFor={"rating"+i} title={i/2} onClick={clickHandler1}/></input>);
    }
    return (<fieldset className="rate" id={"rate"+this.props.id}>{items}</fieldset>);
  }
});
module.exports = StarRating;