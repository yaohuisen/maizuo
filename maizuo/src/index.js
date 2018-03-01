import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from "redux"
import {Provider} from "react-redux";
const reducers = combineReducers({
	title : function(state="",action){
		switch(action.type){
			case "ADD_TO_TITLE":
				
				return action.payload;
			default : 
				return state;
		}
		return state;
	},
	user : function(state = [],action){
		state = {
			username : ""
		}
		if(localStorage.getItem("date")){
			console.log(12)
			var data = JSON.parse(localStorage.getItem("date"))
			state = data
			
		}
		
		function saveTolocal(state){
			localStorage.setItem("date",JSON.stringify(state));
			
		}
		
		switch(action.type){
			
			case "GO_TO_USER":
				
				state.username = action.payload;
				saveTolocal(state);
				return state.username;
			default :
				
				return state.username;
		}
		
	
	}
})

const store = createStore(reducers,{})
function renderPage(){
	ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
}
renderPage();
store.subscribe(renderPage)
registerServiceWorker();
