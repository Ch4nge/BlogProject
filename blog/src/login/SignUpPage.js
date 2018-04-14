import React, {Component} from 'react';

export default class SignUpPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    signUp(event){
        if(this.state.password === this.state.password2){
            let data = {
                username: this.state.username,
                password: this.state.password,
                role: "user"
            }
            this.props.signUp(data);
        }
    }

    render(){
        return(
            <div className="card">
                <tbody className="loginForm">
                    <tr>
                        <th>Username:</th>
                        <th><input name="username" placeholder="Username" type="text" onChange={this.handleChange}/></th>
                    </tr>
                    <tr>    
                        <th>Password:</th>
                        <th><input name="password" placeholder="Password" type="password" onChange={this.handleChange}/></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><input name="password2" placeholder="Re-type password" type="password" onChange={this.handleChange}/></th>
                    </tr>
                    <tr>
                        <th></th>
                        <button onClick={this.signUp}>Sign up!</button>
                    </tr>
                </tbody>
            </div>
        );
        
    }
} 


