import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Article extends Component {

    render(){
        console.log(this.props.article);
        return(
            <div className="card">
                <div className="articleHeaader">
                    <h3>{this.props.article.title}</h3>
                    <h5>{this.props.article.description}, <span className="articleDate">18.3.2018</span></h5>
                </div>
                <div className="articleContent">
                    <p>
                        {this.props.article.content.substring(0,300) + ". . ."}
                    </p>
                </div>
                <Link to={{pathname: "/post/"+this.props.article.id, state: {article: "this.props.article"} }}><button>Read more</button></Link>
            </div>
        );
        
    }
} 


