import React, {Component} from 'react';
import About from '../rightcolumn/About';
import Popular from '../rightcolumn/Popular';
import Tags from '../rightcolumn/Tags';
import {Link} from 'react-router-dom';
export default class MainLayout extends Component {

    constructor(props){
        super(props);
    }


    render(){
        console.log(this.props);
        return(
            <div className="siteWrapper">
                <div className="header">
                    <h1>My blog</h1>
                </div>
                <div className="container">
                    <div className="leftColumn">
                        {this.props.content}
                    </div>
                    <div className="rightColumn">
                        <Link to="/articleForm"><button>Add Article</button> </Link>
                        
                        <About />
                        <Popular />
                        <Tags />
                    </div>
                </div>

                <div className="footer">
                    <h2>Footer</h2>
                </div>
            </div>
        );
        
    }
} 


