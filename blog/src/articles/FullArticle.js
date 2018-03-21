import React, {Component} from 'react';

export default class FullArticle extends Component {

    render(){
        console.log(this.props);
        return(
            <div className="card">
                <div className="articleHeaader">
                    <h3>hello</h3>
                    <h5>hello , <span className="articleDate">18.3.2018</span></h5>
                </div>
                <div className="articleContent">
                    <p>
                        hello
                    </p>
                </div>
            </div>
        );
        
    }
} 


