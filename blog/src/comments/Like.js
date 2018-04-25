import React, {Component} from 'react';

export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: "",
      blogID:"",
      isLiked: false,
      likes:[],
      buttonStyle: "likeButton"
    };
    this.reloadLike = this.reloadLike.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.likeComment = this.likeComment.bind(this);
    this.likePressed = this.likePressed.bind(this);
    console.log(this.props.commentId);
    console.log(this.props.blogID);
  }

  componentWillMount() {
    this.reloadLike()
  }

  likePressed() {
    if(this.state.isLiked) {
        this.setState({isLiked:false});
        this.setState({buttonStyle: "likeButton"})
    } else {
        this.setState({isLiked:true});
        this.setState({buttonStyle: "likeButtonPressed"})
    }

  }

  reloadLike() {
    fetch("http://localhost:8080/comments/"+this.props.commentId + "/like")
    .then(response => response.json())
    .then(response => this.setState({
        likes: response
    }))
  }


    
  likeComment() {
    if(this.state.isLiked) {
      fetch("http://localhost:8080/comments/"+this.props.commentId + "/" + this.props.userdata.userId +"/like", {
        method: "DELETE"
      })
      .then(this.reloadLike);
      console.log("deleted");
    } else {
      fetch("http://localhost:8080/comments/"+this.props.commentId + "/" + this.props.userdata.userId + "/like", {
        body: JSON.stringify({
            memberId: this.props.userdata.userId,
            blogID: this.props.blogID 
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      .then((res) => console.log(res))
      .then(this.reloadLike);
    }
    this.likePressed();
  }
    
  render() {
    
    return(
      <div className="likeField">
        <div className="likeCount">
          <p>{this.state.likes.length}</p>
        </div>
        <button className= {this.state.buttonStyle} onClick={this.likeComment}><span>Like</span></button>
      </div>
    )
  }
}