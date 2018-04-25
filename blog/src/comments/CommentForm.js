import React, {Component} from 'react';


export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            content: ""
        });
        this.postComment = this.postComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    postComment(event) {
        event.preventDefault();
        if(this.props.userdata.loggedIn){
            fetch("http://localhost:8080/blogs/"+this.props.blogID+"/comments", {
                body: JSON.stringify({
                    userName: this.props.userdata.username, 
                    content: this.state.content
                }),
                headers: {
                "Content-Type": "application/json"
                },
                method: "POST"
            })
            .then((res) => console.log(res))
            .then((res) => {
                console.log(res)
                this.props.fetchPosts();
            });
            this.refs.content.value = "";
            this.setState({
                content: ""
            })
        }
    }
    
    renderContent(){
        if(this.props.userdata.loggedIn){
            return(
                <form>
                    Content:<br/>
                    <textarea rows="5" cols="60" 
                        name="content"
                        ref="content" 
                        onChange={this.handleChange}/><br/>
                    <button onClick={this.postComment}>Post</button><br/>
                </form>
            );
        }else{
            return <div><p>Log in to post comments</p></div>;
        }
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}