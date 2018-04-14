import React, {Component} from 'react';

export default class Like extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            memberId: ""
        });

        this.likeComment = this.likeComment.bind(this);
        console.log(this.props.commentId);

    }


    likeComment() {
        let membId = 1;
        fetch("http://localhost:8080/blogs/"+ membId +"/comments/"+this.props.commentId + "/like", {
            body: JSON.stringify({
                memberId: membId, 
            }),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          })
        .then((res) => console.log(res))
    }
    
    render() {
        return(
            <div>
                <button className="likeButton" onClick={this.likeComment}><span>Like</span></button>
            </div>
        )
    }
}