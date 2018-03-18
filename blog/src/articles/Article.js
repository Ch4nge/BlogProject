import React, {Component} from 'react';

export default class Article extends Component {

    render(){
        return(
            <div className="card">
                <div className="articleHeaader">
                    <h3>Blog entry</h3>
                    <h5>Title description, <span className="titleDescription">18.3.2018</span></h5>
                </div>
                <p>Bacon ipsum dolor amet venison prosciutto burgdoggen tail filet mignon buffalo shank doner corned beef leberkas tri-tip porchetta. 
                    Bacon ipsum dolor amet venison prosciutto burgdoggen tail filet mignon buffalo shank doner corned beef leberkas tri-tip porchetta.
                    Bacon ipsum dolor amet venison prosciutto burgdoggen tail filet mignon buffalo shank doner corned beef leberkas tri-tip porchetta.
                </p>
            </div>
        );
        
    }
} 


