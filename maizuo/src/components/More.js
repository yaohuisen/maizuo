import React, {Component} from 'react';
import "../style/More.css"
import Head from "./Head"
import NowPlaying from "./NowPlaying"
import ComingPlaying from "./ComingPlaying"
//import FilmsWrap from "./FilmsWrap"
import {BrowserRouter as Router, Link, NavLink, Route, Redirect, Prompt, Switch} from 'react-router-dom';
export default class More extends React.Component {
	render(){
		
		return(
			
				<div className="App">
				
					
					{<Head title="卖座电影"/>}
					
					<div className="filmsWrap">
						<div className="filmsNav">
							<NavLink to="/more/first" activeClassName="active"><div className="choose now-playing">正在热映</div></NavLink>
							<NavLink to="/more/second" activeClassName="active"><div className="choose coming-playing">即将热映</div></NavLink>
						</div>
						<Switch>
                             <Route path="/more/first" component={NowPlaying}/>
                             <Route path="/more/second" component={ComingPlaying}/>
                         </Switch>	
					</div>
                         				
					
				</div>
		
		)
	}
}
