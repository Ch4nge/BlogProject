import React, {Component} from 'react';

export default class Comment extends Component {

    render(){
        console.log(this.props.article);
        return(
            <div className="card">
                <div className="commentHeader">
                    <h4>{this.props.comment.username}</h4>
                    <h5><span className="articleDate">18.3.2018 15:00</span></h5>
                </div>
                <div className="commentContent">
                    <p>
                        {this.props.comment.content}
                    </p>
                </div>
            </div>
        );
        
    }
} 

