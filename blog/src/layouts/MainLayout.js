import React, {Component} from 'react';
import About from '../rightcolumn/About';


export default class MainLayout extends Component {

    render(){
        return(
            <div>
                <div className="header">
                    <h1>My blog</h1>
                </div>
                <div className="container">
                    <div className="leftColumn">

                    </div>
                    <div className="rightColumn">
                        <About />
                    </div>
                </div>

                <div className="footer">
                    <h2>Footer</h2>
                </div>
            </div>
        );
        
    }
} 


