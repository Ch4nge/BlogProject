import React, {Component} from 'react';
import Like from "../comments/Like"
export default class Comment extends Component {

  render(){
    return(
      <div className="commentCard">
        <span className="userName">{this.props.comment.userName}</span>
        <div className="commentContent">
            <p>
                {this.props.comment.content}
            </p>
        </div>
        <span className="commentDate">18.3.2018 15:00</span>
        
          <Like commentId={this.props.comment.id} />
      
      </div>
    );
      
  }
} 


