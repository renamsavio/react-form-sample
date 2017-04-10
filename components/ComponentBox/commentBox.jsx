import React from 'react';
import ReactDOM from 'react-dom';

import styles from './commentBox.css';
import data from './data.json';

class CommentBox extends React.Component {

	constructor() {
		super();
		this.state = {
			comments: data
		}
	}

	render() {
		return (<div className={styles.commentbox}>
					<CommentForm addComment={this._addComment.bind(this)}/>
					{this.state.comments.map((comment, index) => 
						<Comment key={comment.id}
						         comment={comment.comment} 
						         author={comment.author} 
						         idx={index}
						         onDelete={this._deleteComment.bind(this)}/>)}
				</div>);
	}

	_addComment(author, body) {
		const comment = {
			id: this.state.comments.length + 1,
			author: author,
			comment: body
		}
		this.setState({comments: this.state.comments.concat([comment])});
	}

	_deleteComment(index) {
		const comments = [...this.state.comments];

		comments.splice(index, 1);
		this.setState({ comments });

	}
}

class CommentForm extends React.Component {
	render() {
		return  (
		    <div className={styles.commentform}>
		        <h2 className={styles.title}>NEW COMMENT</h2>
		        <form onSubmit={this._handleSubmit.bind(this)}>
				    <div>
				        <label htmlFor="name">Author:</label>
				        <input type="text" id="name" ref={(input) => this._author = input} />
				    </div>
				    <div>
				        <label htmlFor="msg">Comment:</label>
				        <textarea id="msg" ref={(input) => this._comment = input}></textarea>
				    </div>
				    
				    <div className={styles.button}>
				        <button type="submit">Send</button>
				    </div>
				</form>
		    </div>);
		
	}

	_handleSubmit(event) {
		let author = this._author;
		let comment = this._comment;

		event.preventDefault();
		this.props.addComment(author.value, comment.value);

	}
}

class Comment extends React.Component {
	render() {
		return (
			<div className={styles.comment}>
			    <p>Author: {this.props.author}</p>
				<p>Comment: {this.props.comment}</p>
				<a href="#" onClick={this._handleDelete.bind(this)} className={styles.deletelink}>Delete comment</a>
			</div>);
	}

	_handleDelete(event) {
		event.preventDefault();
		this.props.onDelete(this.props.idx);
	}
}

ReactDOM.render(<CommentBox/>, document.getElementById('mainRegion'));