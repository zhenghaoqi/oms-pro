import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

//language
import intl from "react-intl-universal"
import en_US from "../../language/en_US.json"
import zh_CN from "../../language/zh_CN.json"

const locales = {
  'zh-CN':zh_CN,
  'en-US':en_US,
};


class App extends Component {
  constructor(){
    super();
    this.state = {initDone:false};
  }

  componentDidMount(){
    this.setLanguage(this.props.language);
  }

  setLanguage(language){
    intl.init({
      currentLocale:language,
      locales,
      warningHandler:()=>{},
      commonLocaleDataUrls:{}
    }).then(() => {
      this.setState({initDone:true});
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.language !== nextProps.language){
      this.setLanguage(nextProps.language);
    }
  }

  render() {
    return (
      this.state.initDone &&
      <div className="app-wrapper container-fluid d-flex flex-column p-0">
          <Router>
            <Switch>
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
