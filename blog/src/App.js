import React, { Component } from 'react';
import MainLayout from './layouts/MainLayout';
import ArticlesWrapper from './articles/ArticlesWrapper';
import { Route, Switch } from 'react-router-dom';
import FullArticle from './articles/FullArticle';
import ArticleForm from './articles/ArticleForm';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/articleForm" render={() => <MainLayout content={<ArticleForm/>}/>}/>
          <Route exact={true} path="/" component={() => <MainLayout content={<ArticlesWrapper />} />} />
          <Route path={"/post/:postID"} render={(props) => <MainLayout content={<FullArticle {...props} />} /> } />
        </Switch>
      </div>
    );
  } 
}

export default App;
