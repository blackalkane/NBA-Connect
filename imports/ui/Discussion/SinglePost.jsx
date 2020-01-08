import React from 'react';
import { connect } from 'react-redux';
import '../../css/Discussions.css';
import "../../../node_modules/bulma/css/bulma.css";
import {makeNewComment, deleteComment, editComment} from '../../actions';

class SinglePost extends React.Component {
	constructor(props){
		super(props);
		this.validateSubmission = this.validateSubmission.bind(this);
		this.validateEdit = this.validateEdit.bind(this);
		this.submitNewComment = this.submitNewComment.bind(this);
		this.submitNewEdit = this.submitNewEdit.bind(this);
		this.populateEdit = this.populateEdit.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.updateNewContent = this.updateNewContent.bind(this);
		this.updateNewEdit = this.updateNewEdit.bind(this);
		this.state = {constructing: false, newBody: "", newEdit: "", editingId: "", validEdit: false, validNew: false};
	}

	populateEdit(id, content) {
		this.setState({
			newEdit: content,
			editingId: id
		})
	}

	deleteComment(postId, commentId) {
		this.props.deleteComment(postId, commentId, this.props.userState.JWTToken);
	}
	
	validateSubmission(body) {
		this.setState({
			validNew: body.length > 1
		})
	}

	validateEdit(body) {
		this.setState({
			validEdit: body.length > 1
		})
	}

	updateNewContent(e) {
		this.validateSubmission(e.target.value);
		this.setState({
			newBody: e.target.value
		})
	}

	updateNewEdit(e) {
		this.validateEdit(e.target.value);
		this.setState({
			newEdit: e.target.value
		})
	}

	submitNewComment() {
		this.props.makeNewComment(this.props.post._id, this.state.newBody, this.props.userState.JWTToken);
		this.setState({
			newBody: "",
			editingId: ""
		})
	}

	submitNewEdit() {
		this.props.editComment(this.props.post._id, this.state.editingId, this.state.newEdit, this.props.userState.JWTToken);
		this.setState({
			newEdit: "",
			editingId: ""
		})
	}

	render() {
		return (
			<div>
			<p>{this.props.forumState.error}</p>
			<h3> {this.props.post.postTitle} </h3> <h5> by {this.props.post.userName} at {this.props.post.postedDate} </h5> <br/>
				<p> {this.props.post.postBody}</p>
				<br/>
			<ul name="comments">
				{this.props.post.comments.map((message, index) => (
				<li className="commentRow" key={message.id}>
					<h5> {message.userName} at {message.postedDate} {message.updatedTime && <span> updated at {message.updatedTime} </span>}</h5>
					{message.id == this.state.editingId ?
					<div>
					<input className="input" type="text" value={this.state.newEdit} onChange={this.updateNewEdit} placeholder="New content"/><br/>
					</div>
					:
					<p> {message.content} </p>
					}
					<button type="button" className="editButton button is-light is-small" onClick={() => this.populateEdit(message.id, message.content)} hidden={this.props.userState == undefined || this.props.userState._id != message.userId}>Edit</button>
					<button type="button" className="editButton button is-light is-small" onClick={() => this.deleteComment(this.props.post._id, message.id)} hidden={this.props.userState == undefined || this.props.userState._id != message.userId}>Delete</button>
					<button type="button" className="editButton button is-light is-small" onClick={this.submitNewEdit} hidden={this.state.editingId != message.id}>Confirm edit</button>
				</li>
				))}
			</ul>
			{this.props.userState.DisplayName == undefined ?
			<p> Must be logged in to add a comment. </p> 
			:
			<div> 
			<br/>
			<input className="input" type="text" value={this.state.newBody} onChange={this.updateNewContent} placeholder="Type out your comment"/>
			<br/><br/>
			<div><input type="submit" className="button is-success" value="Submit comment" onClick={this.submitNewComment}/> <br/></div>
			</div>
			}
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
		makeNewComment: (id, body, token) => {
			dispatch(makeNewComment(id, body, token))
		},
		deleteComment: (postId, commentId, token) => {
			dispatch(deleteComment(postId, commentId, token))
		},
		editComment: (postId, commentId, body, token) => {
			dispatch(editComment(postId, commentId, body, token))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
