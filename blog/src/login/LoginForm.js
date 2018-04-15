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
            <div>
                <div name="form-login" id="login">
                    <form>
                        <span class="fontawesome-user"></span>
                        <input id="user" name="username" placeholder="Username" type="text" onChange={this.handleChange}/>
                        <span class="fontawesome-lock"></span>
                        <input id="password" name="password" placeholder="Password" type="password" onChange={this.handleChange}/>
                    </form>
                    <div className="loginBtns">
                        <Link to="/signup"><a className="signUpBtn">Sign up</a> </Link>
                        <a className="loginBtn" onClick={this.login}>Log in</a>
                    </div>
                </div>
            </div>
        );
        
    }
} 


