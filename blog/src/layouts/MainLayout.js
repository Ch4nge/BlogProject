import React, {Component} from 'react';
import About from '../rightcolumn/About';
import Popular from '../rightcolumn/Popular';
import Tags from '../rightcolumn/Tags';
import LoginForm from '../login/LoginForm.js';
import SignUpForm from '../login/SignUpForm';
import {Link} from 'react-router-dom';
import ArticleFilter from '../articles/ArticleFilter';
import ArticleForm from '../articles/ArticleForm';

export default class MainLayout extends Component {

    constructor(props){
        super(props);

        this.state = {
            showLogin: false,
            showSignUp: false,
            logInTriggerText: "Log in"
        }

        this.renderLogin = this.renderLogin.bind(this);
        this.signUpTrigger = this.signUpTrigger.bind(this);        
    }

    renderPostBtn(){
        if(this.props.userdata.role === "admin") {
            return (
            <div>
                <ArticleForm login={this.props.login} logOut={this.props.logOut} signUp={this.props.signUp} userdata={this.props.userdata} setRedirect = {this.props.setRedirect}/>;
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#postNotificationModal">Add Article</button>    
            </div>
        )
        }
    }
    renderLogin(){
        if(this.state.showSignUp){
            return(
                <SignUpForm signUp={this.props.signUp}/>
            );
        }else if(this.state.showLogin){
            if(this.props.userdata.loggedIn){
                return (
                <div id="login">
                    <a class="loginBtn" id="logOut" onClick={this.props.logOut}>logout</a>
                </div>
                );
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

    renderLogInTrigger(){
        let text;
        if(this.props.userdata.loggedIn)
            text = this.props.userdata.username;
        else
            text = "Log in"
        
        return(
            <div className="loginTrigger" onClick={() => { 
                this.setState({
                    showLogin: !this.state.showLogin,
                    showSignUp: false
                    })}}>
                <a>
                {text}
                <i className="fa fa-angle-double-down"></i>
                </a>
            </div>
        );
    }

    render(){
        return(
            <div className="siteWrapper">
                <div className="header">
                    <div className="sides">
                    </div>
                    <div className="info">
                    <h1>HUIKEE BLOGI</h1>
                    
                    </div>
                </div>
                <div className="container">
                    <nav>
                        {this.renderLogInTrigger()}
                        {this.renderLogin()}
                    </nav>
                    <div className="leftColumn">
                        {this.props.content}
                    </div>
                    <div className="rightColumn">
                        {this.renderPostBtn()}
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


