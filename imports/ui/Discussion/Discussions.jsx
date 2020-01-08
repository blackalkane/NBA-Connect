import React from 'react';
import Modal from 'react-modal';
import SinglePost from './SinglePost';
import { connect } from 'react-redux';
import '../../css/Discussions.css';
import {getForumPosts, displayForumPost, makeNewPost} from '../../actions';
import "../../../node_modules/bulma/css/bulma.css";

class Discussions extends React.Component {
	constructor(props){
		super(props);
		this.display = this.display.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
		this.createNew = this.createNew.bind(this);
		this.validateSubmission = this.validateSubmission.bind(this);
		this.changeNewBody = this.changeNewBody.bind(this);
		this.changeNewTitle = this.changeNewTitle.bind(this);
		this.confirmNew = this.confirmNew.bind(this);
		this.incrementOffset = this.incrementOffset.bind(this);
		this.decrementOffset = this.decrementOffset.bind(this);
		this.state = {displayedId: 0, filter: "", newPostModal: false, discussionModal: false, newTitle: "", newBody: "", valid: false, offset: 0};
	}

	incrementOffset() {
		this.setState({offset: this.state.offset + 10})
	}

	decrementOffset() {
		this.setState({offset: this.state.offset - 10})
	}

	changeNewBody(e) {
		this.setState({newBody: e.target.value})
		this.validateSubmission(this.state.newTitle);
	}
	
	changeNewTitle(e) {
		this.validateSubmission(e.target.value);
		this.setState({newTitle: e.target.value});
	}

	confirmNew() {
		this.props.makeNewPost(this.state.newTitle, this.state.newBody, this.props.userState.JWTToken)
	}

	display(id) {
		this.props.displayForumPost(id);
		this.setState({
			discussionModal: true,
			newPostModal: false
		})
	}

	validateSubmission(title) {
		this.setState({
			valid: title.length > 10 && title.length < 75
		})
	}

	createNew() {
		this.setState({
			discussionModal: false,
			newPostModal: true
		})
	}

	applyFilter(e) {
		this.setState({
			filter: event.target.value.toLowerCase(),
			offset: 0
		});
	}

	closeDiscussionModal() {
		this.setState({
			discussionModal: false
		})
	}

	componentDidMount() {
		this.props.getForumPosts();
	}

	render() {
		var posts = [];
		var tempPosts = this.props.forumState.full.filter(x => x.postTitle.toLowerCase().indexOf(this.state.filter) != -1);
		for (var i = this.state.offset; i < tempPosts.length && i < this.state.offset + 10; i++) {
			let element = tempPosts[i]
			posts.push(<a className='list-item' key={element._id} onClick={(i) => this.display(element._id)}><strong>{element.postTitle}</strong> By {element.userName} at {element.postedDate} UTC</a>);
		}
		return (
			<div className="main">
				<section className="hero is-link">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">
								Welcome to discussions
				      </h1>
						</div>
					</div>
				</section>
				<br/>
				<div className="discussionLeft">
					{this.props.userState.DisplayName != undefined ? 
					<div><input type="submit" className="button is-success" value="Create new post" onClick={this.createNew}/> <br/></div>
					: <p> Must be logged in to create a post. </p>}
					<br/>
					<input className="input" type="text" value={this.state.value} onChange={this.applyFilter} placeholder="Filter by title"/>
					<br/>
					<br/>
					<div>
						<button className="button is-light is-small" onClick={this.decrementOffset} disabled={this.state.offset == 0}>Prev</button>
						<button className="button is-light is-small" onClick={this.incrementOffset} disabled={posts.length - this.state.offset < 10}>Next</button>
					</div>
					<div className="list is-hoverable">
						{posts}
					</div>
				</div>
				<div className="discussionRight">
					{this.state.discussionModal && 
					<SinglePost post={this.props.forumState.selected}/>}
					{this.state.newPostModal && 
					<div>
					<h1> New Post </h1>
					<input className="input" type="text" value={this.state.newTitle} onChange={this.changeNewTitle} placeholder="New post title"/>
					<br/>
					<br/>
					<textarea className="input" value={this.state.newBody} onChange={this.changeNewBody} placeholder="New post body"/>
					<br/>
					<br/>
					<input type="submit" className="button is-success" value="Confirm new post" onClick={this.confirmNew} disabled={!this.state.valid}/>
					</div>}
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return {
		userState: state.userState.userData,
		forumState: state.forumState
	}; //now it will appear as props
}

const mapDispatchToProps = dispatch => {
	return {
		getForumPosts: () => {
			dispatch(getForumPosts())
		},
		displayForumPost: (id) => {
			dispatch(displayForumPost(id))
		},
		makeNewPost: (title, body, token) => {
			dispatch(makeNewPost(title, body, token))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussions);
