import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Tags extends Component {

    constructor(props){
        super(props);
        this.state = {
            tags: []
        }
    }

    componentWillMount(){
        fetch('http://127.0.0.1:8080/tags')
            .then(response => response.json())
            .then(response => this.setState({
                tags: response
            }));
    }


    render(){
        return(
            <div className="card">
                <div>
                    <h2>Tags</h2>
                </div>
                <p>
                    {this.state.tags.map((tag) =>{
                        return <Link key={tag.id}onClick={this.forceUpdate} to={"/tags/"+tag.title}><span className="tag">{tag.title}</span></Link> 
                    })}
                </p>
            </div>
        );
        
    }
} 


