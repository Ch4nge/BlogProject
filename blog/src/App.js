import React, { Component } from 'react';
import MainLayout from './layouts/MainLayout';
import ArticlesWrapper from './articles/ArticlesWrapper';
import { Route, Switch } from 'react-router-dom';
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
      }
    }
    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  login(data){
    console.log(data);
    fetch("http://localhost:8080/users/login", {
        body: JSON.stringify({
            username: data.username,
            password: data.password
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
    })
    .then((res) => res.json())
    .then((res) =>{
        this.setState({
          userdata: {
            username: res.username,
            role: res.role,
            password: res.password,
            loggedIn: true
          }
        })
        console.log(res);
    });
}

logOut(event){
    event.preventDefault();
    this.setState({
        userdata: {
          username: "",
          role: "",
          loggedIn: false
        }
    })
}


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/articleForm" render={() => 
            <MainLayout login={this.login} logOut={this.logOut} userdata={this.state.userdata} content={<ArticleForm/>}/>}/>
          <Route exact={true} path="/" component={() => 
            <MainLayout login={this.login} logOut={this.logOut} userdata={this.state.userdata} content={<ArticlesWrapper />} />} />
          <Route path={"/post/:postID"} render={(props) => 
            <MainLayout login={this.login} logOut={this.logOut} userdata={this.state.userdata} content={<FullArticle {...props} />} /> } />
        </Switch>
      </div>
    );
  } 
}

export default App;
