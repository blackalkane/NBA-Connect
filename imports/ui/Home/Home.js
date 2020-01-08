import React from 'react';
import { connect } from 'react-redux';
//import '../../css/App.css';
//import '../../css/MyAccount.css';
import NewsDashboard from '../LogIn/NewsDashboard'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<section className="hero is-link">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">
								Home
			      </h1>
						</div>
					</div>
				</section>
				<div className="">
					<div className="media">
						<div className="media-content">
							<NewsDashboard />
						</div>
						<div className="media-right">
							<TwitterTimelineEmbed sourceType="URL" url="https://twitter.com/NBA" options={{ height: 450, width: 300 }} />
						</div>
					</div>
				</div>
				<footer className="footer">
			  <div className="content has-text-centered">		
				<p>Copyright© by Tony Chen, Peter Han and Yuting Wen</p>
			  </div>
			</footer>
			</div>
		);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return { count: state.count }; //now it will appear as props
}

export default connect(mapStateToProps)(Home);
