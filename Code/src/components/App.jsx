import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../common/header/Header';
import './App.scss';
import Youtube from './youtube/Youtube';
import YoutubePlayer from './youtube/player/Youtube.Player';
import { appConfig } from '../config';

const config = appConfig;
let store;
const onChanges = (fn) => {
  // eslint-disable-next-line no-console
  console.log(fn,'in changes');

  // console.dir(this.a.__proto__.prototype.setState,'in changes');
  
  if (fn) {
    store = fn;
  }

  store();
  // this.a.__proto__.prototype.setState({});
};
let titleStore = '';
const setTitle = (title) => {
  if (title) {
    titleStore = title;
  }
  return titleStore;
};

class App extends Component {
  state = {
    showFilter: true,
    trends: []
  }

  showFilterHandler = (arg) => {
    if(arg){
      this.setState({
        showFilter : arg
      });
    }
  }

  renderComp = (arg) => {
    this.setState({
      trends: arg
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Header config={config} renderComp={this.renderComp} onChanges={onChanges} showFilter={this.state.showFilter} setTitle={setTitle}/>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/youtube"/>)}/>
            <Route exact path="/youtube" render={()=><Youtube 
              config={config} showFilterHandler={this.showFilterHandler} onChanges={onChanges} setTitle={setTitle} showFilter={this.state.showFilter} />}/>
            <Route exact path="/youtube/:videoId"  render={() => <YoutubePlayer showFilterHandler={this.showFilterHandler}  />}  />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
