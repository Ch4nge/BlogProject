import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="loginContainer">
                <div className="loginForm">
                    <input name="username" placeholder="Username" type="text" onChange={this.onHandleChange}/>
                    <input name="password" placeholder="Password" type="password" onChange={this.onHandleChange}/>
                    <a href="" onClick={this.login}>Login</a>
                </div>

                <div className="signUpBtn">
                    <a href="/users">Sign up</a>
                </div>
            </div>
        );
        
    }
} 


