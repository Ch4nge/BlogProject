import React, {Component} from 'react';
import About from '../rightcolumn/About';
import Popular from '../rightcolumn/Popular';
import Tags from '../rightcolumn/Tags';
import LoginForm from '../login/LoginForm.js';
import SignUpForm from '../login/SignUpForm';
import {Link} from 'react-router-dom';
import ArticleFilter from '../articles/ArticleFilter';


export default class MainLayout extends Component {

    constructor(props){
        super(props);

        this.state = {
            showLogin: false,
            showSignUp: false
        }

        this.renderLogin = this.renderLogin.bind(this);
        this.signUpTrigger = this.signUpTrigger.bind(this);        
    }

    renderLogin(){
        if(this.state.showSignUp){
            return(
                <SignUpForm signUp={this.props.signUp}/>
            );
        }else if(this.state.showLogin){
            if(this.props.userdata.loggedIn){
                return <button onClick={this.props.logOut}>logout</button>;
            }else{
                return <LoginForm login={this.props.login} signUpTrigger={this.signUpTrigger}/>;
            }
        }    
    }

    signUpTrigger(open){
        this.setState({
            showSignUp: open
        })
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
                    <nav>
                        <div className="loginTrigger" onClick={() => { 
                            this.setState({
                                showLogin: !this.state.showLogin,
                                showSignUp: false
                                })}}>
                            <a>
                            Log in
                            <i className="fa fa-angle-double-down"></i>
                            </a>
                        </div>
                        {this.renderLogin()}
                    </nav>
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


