import React, {Component} from 'react';

export default class SignUpForm extends Component {

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
            <div>
                <div name="form-signin" id="login">
                    <form>
                        <div>
                            <span className="fontawesome-user"></span>
                            <input 
                                id="user" 
                                name="username" 
                                placeholder="Username" 
                                type="text" 
                                onChange={this.handleChange}
                                className="userSignUp"
                                />
                        </div>
                        <div>
                            <span className="fontawesome-lock"></span>
                            <input 
                                id="password" 
                                name="password" 
                                placeholder="Password" 
                                type="password" 
                                onChange={this.handleChange}
                                className="passwordSignUp"
                                />
                        </div>
                        <div>
                            <span className="fontawesome-lock"></span>
                            <input 
                                id="confirm_password" 
                                name="password2" 
                                placeholder="Re-type password" 
                                type="password" 
                                onChange={this.handleChange}
                                className="passwordSignUp"/>
                        </div>
                        <a className="signUpBtn2" onClick={this.signUp}>Sign up</a>
                    </form>
                </div>
            </div>
        );
    }


}