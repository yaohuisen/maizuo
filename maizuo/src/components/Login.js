import React, {Component} from 'react';
import {connect} from "react-redux";
import '../style/antd-mobile.css';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import DatePicker from 'antd-mobile/lib/date-picker';
import Head from "./Head" 
import "../style/Login.css"
class LoginUI extends Component {
	constructor(){
		super();
		this.login = this.login.bind(this);
		this.state = {
			title: "登陆"
		}
		this.tuichu = this.tuichu.bind(this);
	}
	componentDidMount(){
		console.log(this.props.user)
		
	}
	login(user){
		this.props.User(user);
	}
	tuichu(){
		localStorage.removeItem("data");
		this.state.title = "登陆";
		this.props.User("");
		
	}
	 render () {
	 	
	 			var h1 = 
	 				<div className="h1">
	 					<h1>您好{this.props.user}</h1>
	 					
	 					<span onClick={this.tuichu}>退出</span>
	 				</div>
	 			var form = 
		 			<div className="form">
							<input type="text" placeholder="输入手机号" ref='ipt'/>
							<input type="password" placeholder="输入密码"/>
							
							<button onClick={()=>this.login(this.refs.ipt.value)}>登陆</button>					
					</div>	 	
			 	if(this.props.user){
			 		form = null;
			 		this.state.title = "我的"
			 	}else{
			 		h1 = null
			 	}
	 	return (

			
					
				<div className="App">
					{<Head title={this.state.title}/>}
					{form}
					{h1}
				</div>
	 				
	 		)
	 }
}
const mapStateToProps = (state, props)=>{
	return {
		user : state.user
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		User:function(str){
			dispatch({
				type:"GO_TO_USER",
				payload:str
			})
		}
	}
}
var Login = connect(mapStateToProps, mapDispatchToProps)(LoginUI)
export default Login;