var React = require('react');
var webAPIUtils = require('../webutils/Webutils');

var LoginBox = React.createClass({
	formsubmit:function(e){
 		e.preventDefault();
		webAPIUtils.Logincheck();
	},
	render : function(){
		$("#logout").hide();
		return(
		<div><br/><br/>
			<div id="main" className="col-md-6 col-lg-6 col-md-offset-1 col-lg-offset-1" >
				<img className="img img-responsive paraLogo" src="img/vr1.jpg"/>
				<p className="paragraph">
				We Are One – an organization standing strong and tall on a foundation of 25 years of thorough research on human behavioral patterns. Our prime objective is to make the world <strong>One Happy Home</strong>. VR1 is a non-profit organization, non-political, non-religious & non-commercial. In order to give a practical framework to the ‘idea of the founder’, the students of Mr. SVK, from about 500 institutes like the prestigious IITs ,IIMs, BITs, NITs, Medical colleges and numerous other professional colleges, teamed up and thus, VR1 was launched on 1st January 2009 ,heralding a new era in human progressVR1 empowers students by providing them with the power of execution through financial, technical and strategic assistance in the form of funds, scholarships, projects, seminars, workshops, blogs, forums and many more facilities.
				</p>
			</div>
			<div id="Loginform" onSubmit={this.formsubmit}>
			    <div id="main" className="col-md-4 col-md-offset-1 well">
			            <form id="login" >
			                    <div className="form-group" >
			                        <legend className="text-info"> Login Form</legend>
			                        <label className="heading">Username</label>
			                        <input type="text" className="form-control" 
			                         id="name" placeholder="Enter Your Mobile Number"   required>
			                        </input>
			                    </div>
			                 
			                    <div className="form-group" id="color">
			                        <label >Password</label>
			                        <input  type="password" className="form-control" id="pass" placeholder="Enter Your Password"  required >
			                        </input>
			                    </div>

			                   <input type="submit" id="send" className="btn btn-lg btn-block button" value="Login">
			                   </input>

			            </form>
			    </div>	
			</div> 
			</div>			);
	}

});
module.exports = LoginBox;