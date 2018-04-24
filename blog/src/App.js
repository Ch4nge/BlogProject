import React, { Component } from 'react';
import MainLayout from './layouts/MainLayout';
import ArticlesWrapper from './articles/ArticlesWrapper';
import { Route, Switch, Redirect } from 'react-router-dom';
import FullArticle from './articles/FullArticle';
import ArticleForm from './articles/ArticleForm';


class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      userdata: {
        username: "",
        role: "",
        password: "",
        loggedIn: false
      },
      redirect: false
    }
    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  login(data){
    fetch("http://localhost:8080/users/login", {
        body: JSON.stringify({
            username: data.username,
            password: data.password,
            role: data.role
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    })
    .then((res) => {
      if(res.status === 200){
        return res.json()
      }       
    })
    .then((res) =>{
      if(res !== undefined){
        this.setState({
          userdata: {
            username: res.username,
            role: res.role,
            password: res.password,
            loggedIn: true
        }
        })
      }
    });
  }

  logOut(event){
      event.preventDefault();
      this.setState({
          userdata: {
            username: "",
            role: "",
            loggedIn: false
          },
          redirect: false
      })
  }

  signUp(data){
    fetch("http://localhost:8080/users", {
        body: JSON.stringify({
            username: data.username,
            password: data.password,
            role: data.role
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    })
    .then((res) => {
      if(res.status === 201){
        this.login(data);
        this.setState({
          redirect: true
        });
      }
    })
  }

  redirect(){
    if(this.state.redirect){
      this.setState({
        redirect: false
      })
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <div className="App">
        {this.redirect()}
        <Switch>
          <Route path="/articleForm" render={() => 
            <MainLayout login={this.login} logOut={this.logOut} signUp={this.signUp} userdata={this.state.userdata} content={<ArticleForm/>}/>}/>
          <Route exact={true} path="/" component={() => 
            <MainLayout login={this.login} logOut={this.logOut} signUp={this.signUp} userdata={this.state.userdata} content={<ArticlesWrapper />} />} />
          <Route path={"/post/:postID"} render={(props) => 
            <MainLayout login={this.login} logOut={this.logOut} signUp={this.signUp} userdata={this.state.userdata} content={
            <FullArticle userdata = {this.state.userdata} {...props} />} /> } />
        </Switch>
      </div>
    );
  } 
}

export default App;
