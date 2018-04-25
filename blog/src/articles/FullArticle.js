import React, {Component} from 'react';
import Comment from '../comments/Comment';
import CommentForm from '../comments/CommentForm';
import Like from "../comments/Like";
import {Redirect} from 'react-router-dom';

export default class FullArticle extends Component {


    constructor(props){
        super(props);
        this.state = {
            article: {
                title: "..",
                description: "",
                content: ""
            },
            comments: [],
            deleted: false
        }
        this.fetchPosts = this.fetchPosts.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.checkRole = this.checkRole.bind(this);
        this.removeArticle = this.removeArticle.bind(this);
    }
    
    componentWillMount(){
        fetch('http://127.0.0.1:8080/blogs/'+this.props.match.params.postID)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    article: response,
                });
                this.fetchPosts();
            });
    }
    
    fetchPosts(){
        console.log("HELLO");
        fetch('http://127.0.0.1:8080/blogs/'+this.props.match.params.postID+"/comments")
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState({
                comments: response
            });
        });
    }
    deleteComment(event, commentID){
        event.preventDefault();
        console.log(this.props.userdata);
        fetch("http://127.0.0.1:8080/blogs/"+this.props.match.params.postID+"/comments/"+commentID, {
            body: JSON.stringify({
                username: this.props.userdata.username,
                password: this.props.userdata.password
            }),
            headers: {
                "Content-Type": "application/json"
              },
            method: "DELETE"
        }).then( (res) => {
            this.fetchPosts();
        })
    }

    redirect(){
        if(this.state.deleted)
            return <Redirect to="/" />;
    }

    checkRole(comment) {
        if(this.props.userdata.role === "admin") {
            return(
                <div className = "flat-right">
                <button type="button" 
                        class="btn btn-warning" 
                        onClick={(event) => this.deleteComment(event, comment.id)}>Delete</button>
                </div>
            ) 
        }

    }

    removeArticle(){
        fetch("http://127.0.0.1:8080/blogs/"+this.props.match.params.postID, {
            body: JSON.stringify({
                username: this.props.userdata.username,
                password: this.props.userdata.password
            }),
            headers: {
                "Content-Type": "application/json"
              },
            method: "DELETE"
        }).then( (res) => {
            this.setState({
                deleted: true
            })
        })
    }

    

    renderRemoveArticle(){
        if(this.props.userdata.role === "admin") {
            return <button onClick={this.removeArticle} className="btn btn-warning">Delete article</button>
        }
    }

    render(){
        console.log(this.props.userdata);
        let comments = this.state.comments;
        console.log(comments);
        console.log(this.props.userdata)
        return(
            <div className="card">
            {this.redirect()}
            <div className="articleCard">
                <div className="imgContainer">
                    <img className="titleImg" src={this.state.article.image_url} />
                </div>
                <div className="articleTextContent">
                    <span className="articleTitle">{this.state.article.title}</span>
                    <h5>{this.state.article.description} , <span className="articleDate">18.3.2018</span></h5>    
                    <div className="articleContent">
                        <p>
                            {this.state.article.content}
                        </p>
                    </div>
                    {this.renderRemoveArticle()}
                </div>    
            </div>
            
                <h4>Comments</h4>
                {comments.map((comment) =>{
                    return (
                        <div>
                            <Comment key={comment.id} comment={comment} blogID ={this.props.match.params.postID}/>
                                <div className = "commentBox">
                                <Like commentId={comment.id} blogID ={this.props.match.params.postID} userdata={this.props.userdata}/>
                                {this.checkRole(comment)}
                            </div>
                        </div>
                    )
                    })}
                <CommentForm userdata={this.props.userdata} blogID={this.props.match.params.postID} fetchPosts={this.fetchPosts}/>
            </div>
        );
        
    }
} 


