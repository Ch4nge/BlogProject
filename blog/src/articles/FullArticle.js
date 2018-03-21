import React, {Component} from 'react';

export default class FullArticle extends Component {


    constructor(props){
        super(props);
        this.state = {
            article: {
                title: "..",
                description: "",
                content: ""
            }
        }
    }
    
    componentWillMount(){
        fetch('http://127.0.0.1:8080/blogs/'+this.props.match.params.postID)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    article: response
                });
                console.log(response);
            });
    }
    


    render(){
        console.log(this.props);
        return(
            <div className="card">
                <div className="articleHeaader">
                    <h3>{this.state.article.title}</h3>
                    <h5>{this.state.article.description} , <span className="articleDate">18.3.2018</span></h5>
                </div>
                <div className="articleContent">
                    <p>
                        {this.state.article.content}
                    </p>
                </div>
            </div>
        );
        
    }
} 


