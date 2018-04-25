import React, { Component } from 'react';
import MainLayout from './layouts/MainLayout';
import ArticlesWrapper from './articles/ArticlesWrapper';
import { Route, Switch, Redirect } from 'react-router-dom';
import FullArticle from './articles/FullArticle';
import ArticleForm from './articles/ArticleForm';
import ArticleSearchWrapper from './articles/ArticleSearchWrapper';

class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      userdata: {
        username: "",
        password: "",
        userId: "",
        role: "",
        password: "",
        loggedIn: false
      },
      redirect: false
    }
    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
    this.signUp = this.signUp.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentWillMount() {
    
    let storage = window.localStorage;
    this.setState({
      userdata: {
        loggedIn: storage.getItem('loggedIn') === 'true',
        username: storage.getItem('username'),
        password: storage.getItem('password'),
        userId: parseInt(storage.getItem('userId')),
        role: storage.getItem('role')
      }
    });
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
        let storage = window.localStorage;
        storage.setItem('loggedIn', "true");
        storage.setItem('username', res.username);
        storage.setItem('password', res.password);
        storage.setItem('role', res.role);
        storage.setItem('userId', res.id.toString());

        this.setState({
          userdata: {
            userId: res.id,
            username: res.username,
            password: res.password,
            role: res.role,
            loggedIn: true
        }
        })
      }
    });
  }

  logOut(event){
      event.preventDefault();
      let storage = window.localStorage;
      storage.clear();
      this.setState({
          userdata: {
            username: "",
            role: "",
            password: "",
            userId: "",
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
            role: "admin"
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

  setRedirect() {
    this.setState({
      redirect: true
    })
  }

  render() {
    console.log(this.state.userdata);
    return (
      <div className="App">
        {this.redirect()}
        <Switch>
          <Route exact={true} path="/" component={(props) => 
            <MainLayout login={this.login} logOut={this.logOut} signUp={this.signUp} userdata={this.state.userdata} setRedirect = {this.setRedirect}
            content={<ArticlesWrapper {...props}/>} />} />
          <Route path={"/post/:postID"} render={(props) => 
            <MainLayout login={this.login} logOut={this.logOut} signUp={this.signUp} userdata={this.state.userdata} setRedirect = {this.setRedirect} content={
            <FullArticle userdata = {this.state.userdata} {...props} />} /> } />
          <Route path={"/tags/:tagName"} render={(props) => 
          <MainLayout login={this.login} logOut={this.logOut} signUp={this.signUp} userdata={this.state.userdata} setRedirect = {this.setRedirect} content={
            <ArticleSearchWrapper {...props} />
          }/>} />
        </Switch>
      </div>
    );
  } 
}

export default App;
