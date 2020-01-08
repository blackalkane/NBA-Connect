import React from 'react';
import { connect } from 'react-redux';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

class TeamTwitter extends React.Component {
	teamTwitterLink(teamName) {
		switch (teamName) {
			case "76ers":
				return "https://twitter.com/sixers";
			case "blazers":
				return "https://twitter.com/trailblazers";
			case "bucks":
				return "https://twitter.com/Bucks";
			case "bulls":
				return "https://twitter.com/chicagobulls";
			case "cavaliers":
				return "https://twitter.com/cavs";
			case "celtics":
				return "https://twitter.com/celtics";
			case "clippers":
				return "https://twitter.com/LAClippers";
			case "grizzlies":
				return "https://twitter.com/memgrizz";
			case "hawks":
				return "https://twitter.com/ATLHawks";
			case "heat":
				return "https://twitter.com/MiamiHEAT";
			case "hornets":
				return "https://twitter.com/hornets";
			case "jazz":
				return "https://twitter.com/utahjazz";
			case "kings":
				return "https://twitter.com/SacramentoKings";
			case "knicks":
				return "https://twitter.com/nyknicks";
			case "lakers":
				return "https://twitter.com/Lakers";
			case "magic":
				return "https://twitter.com/OrlandoMagic";
			case "mavericks":
				return "https://twitter.com/dallasmavs";
			case "nets":
				return "https://twitter.com/BrooklynNets";
			case "nuggets":
				return "https://twitter.com/nuggets";
			case "pacers":
				return "https://twitter.com/Pacers";
			case "pelicans":
				return "https://twitter.com/PelicansNBA";
			case "pistons":
				return "https://twitter.com/DetroitPistons";
			case "raptors":
				return "https://twitter.com/Raptors";
			case "rockets":
				return "https://twitter.com/HoustonRockets";
			case "spurs":
				return "https://twitter.com/spurs";
			case "suns":
				return "https://twitter.com/Suns";
			case "thunder":
				return "https://twitter.com/okcthunder";
			case "timberwolves":
				return "https://twitter.com/Timberwolves";
			case "warriors":
				return "https://twitter.com/warriors";
			case "wizards":
				return "https://twitter.com/WashWizards";
			default:
				return "https://twitter.com/NBA";
		}
	}
	render() {
		return (
			<div>
				<TwitterTimelineEmbed sourceType="URL" url={this.teamTwitterLink(this.props.userState.FavoriteTeam)} options={{ height: 700, width: parent }} />
			</div>
		);
	}
}
const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return {
		userState: state.userState.userData,
	}; //now it will appear as props
}

const mapDispatchToProps = dispatch =>{
	return{}
  };
export default connect(mapStateToProps, mapDispatchToProps)(TeamTwitter);
