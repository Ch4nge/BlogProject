import React, {Component} from 'react';

export default class Article extends Component {

    render(){
        return(
            <div className="card">
                <div className="articleHeaader">
                    <h3>{this.props.article.title}</h3>
                    <h5>{this.props.article.description}, <span className="articleDate">18.3.2018</span></h5>
                </div>
                <p>
                    {this.props.article.content}
                </p>
            </div>
        );
        
    }
} 


