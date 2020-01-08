import React from 'react';
import Fragment from 'react';
import UserDetails from './UserDetails';
import NewsDashboard from './NewsDashboard';
import TeamTwitter from './TeamTwitter';
import UserDiscussions from '../Discussion/UserDiscussions';
import { connect } from 'react-redux';
import '../../css/MyAccount.css';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

class MyAccount extends React.Component {
	render() {
		return (
			<div className="main">
				<section className="hero is-link">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">
								Welcome to your account page
				      </h1>
						</div>
					</div>
				</section>

				<div className="left">
					<div className="newsDashboard inner">
						<TeamTwitter />
					</div>
				</div>
				<div className="right">
					<div className="userDetails inner">
						<UserDetails />
					</div>
					<div className="matchInformation inner">
						<UserDiscussions />
					</div>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return {
		userState: state.userState.userData
	}; //now it will appear as props
}

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
