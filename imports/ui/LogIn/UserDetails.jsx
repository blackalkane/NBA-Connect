import React from 'react';
import '../../css/UserDetails.css';
import { connect } from 'react-redux';
import { userUploadProfilePicture, userUpdateDisplay } from '../../actions';
import ImageUploader from './ImageUploader';

class UserDetails extends React.Component {
	constructor(props) {
        super(props);
		this.state = { picture: null, favTeam: this.props.userState.FavoriteTeam, editingTeam: false,
			editingName: false, displayName: this.props.userState.DisplayName };
		this.onDrop = this.onDrop.bind(this);
		this.sendImage = this.sendImage.bind(this);
		this.handleEditTeamClick = this.handleEditTeamClick.bind(this);
		this.handleEditNameClick = this.handleEditNameClick.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeTeam = this.handleChangeTeam.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	sendImage(base64) {
		base64 = base64.split('base64,')[1];
		this.props.userUploadProfilePicture(this.props.userState.Email, this.props.userState.Password, base64)
	}

	handleEditTeamClick() {
		this.setState({editingTeam: !this.state.editingTeam, favTeam: this.props.userState.FavoriteTeam});
	}

	handleEditNameClick() {
		this.setState({editingName: !this.state.editingName, displayName: this.props.userState.DisplayName});
	}

	handleChangeTeam(e) {
		this.setState({
			favTeam: event.target.value
		});
	}

	handleChangeName(e) {
		this.setState({
			displayName: event.target.value
		});
	}
	
	handleSubmit() {
		this.props.userUpdateDisplay(this.props.userState.Email, this.props.userState.Password, this.state.displayName, this.state.favTeam);
		this.setState({editingName: false, editingTeam: false})
	}

	onDrop(picture) {
		try {
			var reader  = new FileReader();
			reader.readAsDataURL(picture.slice(-1)[0]);
			reader.onload = () => this.sendImage(reader.result);
		} catch (err) {
			return;
		}
	}
	
	render() {
		var NBATeams = ['76ers', 'blazers', 'bucks', 'bulls', 'cavaliers',
		'celtics', 'clippers', 'grizzlies', 'hawks', 'heat', 'hornets',
		'jazz', 'kings', 'knicks', 'lakers', 'magic', 'mavericks',
		'nets', 'nuggets', 'pacers', 'pelicans', 'pistons', 'raptors',
		'rockets', 'spurs', 'suns', 'thunder', 'timberwolves', 'warriors',
		'wizards']
		return (
			<div className="main">
			<div>
			<img className="profile" src={"data:image/jpeg;base64," + this.props.userState.ProfileBase64}/>
				<div> 
					<p className="padded"> Name: {!this.state.editingName ? <strong>{this.props.userState.DisplayName}</strong>: 
					<input className="nameSelect" onChange={this.handleChangeName} value={this.state.displayName}></input>}
					<button className="editButton button is-light is-small" onClick={this.handleEditNameClick}>Edit</button>
					<span>{this.state.displayName != this.props.userState.DisplayName ? <button className="editButton button is-light is-small" onClick={this.handleSubmit}>Submit</button>:""}</span></p>
					<p> Favorite team: {!this.state.editingTeam ? 
					<img className="team" src={'logos/' + this.props.userState.FavoriteTeam + '.png'} alt={this.props.userState.FavoriteTeam}/>
					: <select className="favTeamSelect" onChange={this.handleChangeTeam} value={this.state.favTeam}>
					{NBATeams.map((x) => <option key={x}>{x}</option>)}
					</select> } <button className="editButton button is-light is-small" onClick={this.handleEditTeamClick}>Edit</button>     
					{this.state.favTeam != this.props.userState.FavoriteTeam ? <button className="editButton button is-light is-small" onClick={this.handleSubmit}>Submit</button>:""} </p>
					<p className="padded"> Account Type: {this.props.userState.Password == "Facebook"? "Facebook":"Email/Password"} </p>
				</div>
				<ImageUploader
                buttonText='Upload new image'
				onChange={this.onDrop}
				className="padded"
            />
			</div>
			</div>
);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
return {
	userState: state.userState.userData
 }; //now it will appear as props
}

const mapDispatchToProps = dispatch => {
	return {
		userUploadProfilePicture: (email, password, ProfileBase64) => {
			dispatch(userUploadProfilePicture(email, password, ProfileBase64));
		},
		userUpdateDisplay: (email, password, name, team) => {
			dispatch(userUpdateDisplay(email, password, name, team));
		}
	};
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);