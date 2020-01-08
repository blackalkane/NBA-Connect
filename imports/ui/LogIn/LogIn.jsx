import React from 'react';
import MyAccount from './MyAccount';
import { connect } from 'react-redux';
import { userLogIn, userRegister, userReset, facebookLogIn } from '../../actions';
import '../../css/LogIn.css';
import FacebookLogin from 'react-facebook-login';

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var NBATeams = ['76ers', 'blazers', 'bucks', 'bulls', 'cavaliers',
'celtics', 'clippers', 'grizzlies', 'hawks', 'heat', 'hornets',
'jazz', 'kings', 'knicks', 'lakers', 'magic', 'mavericks',
'nets', 'nuggets', 'pacers', 'pelicans', 'pistons', 'raptors',
'rockets', 'spurs', 'suns', 'thunder', 'timberwolves', 'warriors',
'wizards']

class LogIn extends React.Component {
	constructor() {
		super();
		this.state = { jwt: '', email: '', password: '', displayName: '', favTeam: 'raptors', validEmail: false, validPassword: false };
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeTeam = this.handleChangeTeam.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkValidity = this.checkValidity.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleUserReset = this.handleUserReset.bind(this);
		this.handleChangeDisplayName = this.handleChangeDisplayName.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
	}

	responseFacebook(response) {
		this.props.facebookLogIn(response.id, response.email, response.accessToken)
	}

	handleChangeEmail(e) {
		this.setState({
			email: event.target.value
		});
		this.checkValidity(event.target.value, this.state.password)
	}

	handleChangePassword(e) {
		this.setState({
			password: event.target.value
		});
		this.checkValidity(this.state.email, event.target.value);
	}

	handleChangeTeam(e) {
		this.setState({
			favTeam: event.target.value
		});
	}

	handleChangeDisplayName(e) {
		this.setState({
			displayName: event.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.userLogIn(this.state.email, this.state.password, this.state.jwt)
	}

	checkValidity(email, password) {
		var match = re.test(email)
		if (match) {
			this.setState({
				validEmail: true
			})
		} else {
			this.setState({
				validEmail: false
			})
		}
		if (password.length >= 8) {
			this.setState({
				validPassword: true
			})
		} else {
			this.setState({
				validPassword: false
			})
		}
	}

	handleRegister() {
		this.props.userRegister(this.state.email, this.state.password, this.state.displayName, this.state.favTeam)
	}

	handleUserReset() {
		this.props.userReset(this.state.email)
	}

	componentDidMount() {
		if (localStorage.getItem("CachedJWT")) {
			this.props.userLogIn(null, null, localStorage.getItem("CachedJWT"))
		}
	}

	//TODO: Implement facebook OAuth
	render() {
		if (!this.props.userState.isLoggedIn) {
			return (
				<section className="hero is-link is-fullheight">
					<div className="hero-body container column is-5-tablet is-4-desktop is-3-widescreen is-centered">
						<form className="box" onSubmit={this.handleSubmit}>
							<div className="field">
								<label className="label">Email</label>
								<div className="control has-icons-left">
									<input type="email" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email" className="input" required />
									<span className="icon is-small is-left">
										<i className="fa fa-envelope" />
									</span>
								</div>
							</div>
							<div className="field">
								<label className="label">Password</label>
								<div className="control has-icons-left">
									<input type="password" placeholder="*******" value={this.state.password} onChange={this.handleChangePassword} className="input" required />
									<span className="icon is-small is-left">
										<i className="fa fa-lock" />
									</span>
								</div>
							</div>
							<div className="field">
								<input className="button is-success" disabled={!this.state.validEmail || !this.state.validPassword} type="submit" value="Log Me In" />
								<span> </span>
								<button type="button" className="button is-danger" disabled={!this.state.validEmail} onClick={this.handleUserReset} text="Reset Password">
									Reset Password
										</button>
							</div>
							<br />
							<span>  <label className="label">
								Optional display name: </label>
							</span>
							<div className="control has-icons-left">
								<input type="displayName" className="input" value={this.state.displayName} onChange={this.handleChangeDisplayName} />
								<span className="icon is-small is-left">
									<i className="fa fa-user" />
								</span>
							</div>
							<span>  <label className="label">
								Your favorite team: </label>
							</span>
							<select onChange={this.handleChangeTeam} value={this.state.favTeam}>
								{NBATeams.map((x) => <option key={x}>{x}</option>)}
							</select>
							<br />
							<br/>
							<button className="button is-warning" disabled={!this.state.validEmail || !this.state.validPassword} onClick={this.handleRegister} text="Sign me up">Sign me up </button>
							<br />
							<span className="error">{this.props.userState.errorMessage ? this.props.userState.errorMessage : ""}</span>
							<br />
							<div> ──────  or  ──────</div>
							<FacebookLogin
								appId="322151111994092"
								autoLoad={false}
								fields="name,email,picture"
								icon="fa-facebook"
								callback={this.responseFacebook} />
						</form>
					</div>
				</section>
			);
		} else {
			return (
				<MyAccount />
			);
		}
	};
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return {
		userState: state.userState
	}; //now it will appear as props
}

const mapDispatchToProps = dispatch => {
	return {
		userLogIn: (email, password, jwt) => {
			dispatch(userLogIn(email, password, jwt));
		},
		userRegister: (email, password, displayName, favTeam) => {
			dispatch(userRegister(email, password, displayName, favTeam));
		},
		userReset: (email, password) => {
			dispatch(userReset(email));
		},
		facebookLogIn: (id, email, token) => {
			dispatch(facebookLogIn(id, email, token))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
