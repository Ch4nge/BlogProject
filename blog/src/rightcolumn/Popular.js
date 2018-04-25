import React, {Component} from 'react';

export default class Popular extends Component {

    render(){
        return(
            <div className="card">
                <div>
                    <h2>Popular posts</h2>
                </div>
                <ul className="popularList">
                    <li>Hello world!</li>
                    <li>Hello world!</li>
                    <li>Hello world!</li>
                    <li>Hello world!</li>
                </ul>
            </div>
        );
        
    }
} 