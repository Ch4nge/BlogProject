import React, {Component} from 'react';
import Comment from '../comments/Comment';
import CommentForm from '../comments/CommentForm';
import Like from "../comments/Like"

export default class FullArticle extends Component {


    constructor(props){
        super(props);
        this.state = {
            article: {
                title: "..",
                description: "",
                content: ""
            },
            comments: []
        }
        this.fetchPosts = this.fetchPosts.bind(this);
    }
    
    componentWillMount(){
        fetch('http://127.0.0.1:8080/blogs/'+this.props.match.params.postID)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    article: response,
                    comments: []
                });
            });
        this.fetchPosts();
    }
    
    fetchPosts(){
        fetch('http://127.0.0.1:8080/blogs/'+this.props.match.params.postID+"/comments")
        .then(response => response.json())
        .then(response => {
            this.setState({
                comments: response
            });
        });
    }

    render(){
        let comments = this.state.comments;
        console.log(comments);
        return(
            <div className="card">
            
            <div className="articleCard">
            <span className="articleTitle">{this.state.article.title}</span>
                    
                <div className="articleContent">
                    <p>
                        {this.state.article.content}
                    </p>
                </div>
                <h5>{this.state.article.description} , <span className="articleDate">18.3.2018</span></h5>
            </div>
            
                <h4>Comments</h4>
                {comments.map((comment) =>{
<<<<<<< HEAD
                    return (
                        <div>
                        <Comment key={comment.id} comment={comment} blogID ={this.props.match.params.postID}/>
                        <Like commentId={comment.id} blogID ={this.props.match.params.postID}/>
                        </div>
                    )
                    })}
                <CommentForm blogID={this.props.match.params.postID} fetchPosts={this.fetchPosts}/>
=======
                    return <Comment key={comment.id} comment={comment} />
                })}
                <CommentForm userdata={this.props.userdata} blogID={this.props.match.params.postID} fetchPosts={this.fetchPosts}/>
>>>>>>> login-2
            </div>
        );
        
    }
} 


