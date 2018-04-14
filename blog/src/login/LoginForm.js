import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    login(event){
        event.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(data);
        this.props.login(data);
    }

    render(){
        return(
            <div className="loginContainer">
                <div className="loginForm">
                    <input name="username" placeholder="Username" type="text" onChange={this.handleChange}/>
                    <input name="password" placeholder="Password" type="password" onChange={this.handleChange}/>
                    <button onClick={this.login}>Log in</button>
                </div>

                <div className="signUpBtn">
                    <Link to="/signup"><p>Sign up</p> </Link>
                </div>
            </div>
        );
        
    }
} 


