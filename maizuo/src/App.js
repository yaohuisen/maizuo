import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, NavLink, Route, Redirect, Prompt, Switch} from 'react-router-dom';
import Main from "./components/Main"
import Detail from "./components/Detail"
import More from "./components/More"
import Cinema from "./components/Cinema"
import Login from "./components/Login"
import City from "./components/City"
class App extends Component{
	render(){
		
		return(
			
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main} /> 
            <Route path="/detail/:fid" component={Detail} /> 
            <Route path="/more" component={More} />
            <Route path="/login" component={Login} />
             <Route path="/city" component={City} />
            <Route path="/cinema/:fid" component={Cinema} /> 
            <Redirect from="/" to="/"/>
          </Switch>
        </div>
      </Router>					
		)

		
	}
}

export default App;
