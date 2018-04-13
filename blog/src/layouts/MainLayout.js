import React, {Component} from 'react';
import About from '../rightcolumn/About';
import Popular from '../rightcolumn/Popular';
import Tags from '../rightcolumn/Tags';
import LoginForm from '../login/LoginForm';
import {Link} from 'react-router-dom';
import ArticleFilter from '../articles/ArticleFilter'


export default class MainLayout extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        }
    }

    login(data){
        fetch("http://localhost:8080/user/login", {
            body: JSON.stringify({
                loginAttempt: data
            }),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          })
          .then((res) => console.log(res))
          .then((res) => console.log(res));
    }


    render(){
        return(
            <div className="siteWrapper">
                <div className="header">
                    <div className="sides">
                    </div>
                    <div className="info">
                    <h4><a href="#category">on tää kyll</a></h4>
                    <h1>HUIKEE BLOGI</h1>
                    
                    </div>
                </div>
                <div className="container">
                    <LoginForm login={this.login}/>
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


