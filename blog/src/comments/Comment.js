import React, {Component} from 'react';

export default class Comment extends Component {

    render(){
        console.log(this.props.article);
        return(
            <div className="commentCard">
                <span className="userName">{this.props.comment.username}</span>
                <div className="commentContent">
                    <p>
                        {this.props.comment.content}
                    </p>
                    
                </div>
                <span className="commentDate">18.3.2018 15:00</span>
            </div>
        );
        
    }
} 


