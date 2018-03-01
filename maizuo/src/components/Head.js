import React, {Component} from 'react';
import "../style/Head.css";
import $ from "jquery";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link,withRouter} from "react-router-dom"
class Head extends Component {
	constructor(props){
		super(props)
		this.state = {
			city : "",
			flag : false
		}
		this.cityDW = this.cityDW.bind(this);
		this.sideOnOff = this.sideOnOff.bind(this)
		this.gotoCity = this.gotoCity.bind(this)
	}
	cityDW(){
		var that = this
		var geolocation = new window.BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == window.BMAP_STATUS_SUCCESS){
				var geoc = new window.BMap.Geocoder();  
				geoc.getLocation(r.point, function(rs){
					var addComp = rs.addressComponents;
	//				console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					that.setState({
						city : addComp.city
					})
					
				});   
			}
			else {
				console.log('failed'+this.getStatus());
			}        
		},{enableHighAccuracy: true})			
	}
	
	sideOnOff(){
		var that = this;
		$(document).click(function(e){
			var target = e.target;
			if(target.className.toUpperCase() == "ZHEZHAO"){
			
				that.setState({
					flag : false
					
				})
			}
		})
		$(".menu .iconfont").click(function(){
			that.setState({
				flag :!that.state.flag
			})
		})
	}
	gotoCity(){
		this.props.history.push("/city")
	}
	componentDidMount(){
		this.cityDW()
		this.sideOnOff()	
	}
	render() {
		var zhezhao = <div className="zhezhao"></div>
		var ul = <div className="ul">
			<li><Link to="/" exact>首页</Link></li>
			<li><Link to="/more/first">影片</Link></li>
			<li><Link to="/cinema/0">影院</Link></li>
			<li><a href="#">商城</a></li>
			<li><a href="#">我的</a></li>
			<li><a href="#">卖座卡</a></li>
		</div>
		
		if(!this.state.flag){
			zhezhao = null;
			ul = null;
			
		}
		return (
			<div className="top">
	        	<div className="menu">
	        		<span className="iconfont">&#xe60c;</span>
	        	</div>
	        	<div className="title">
	        		{this.props.title}
	        	</div>
	        	<div className="right">
	        		<div className="city" onClick={this.gotoCity}>
	        			{this.props.city || this.state.city} 
	        		</div>
	        		<div className="login">
	        			<Link to="/login"><span className="iconfont">&#xe62e;</span></Link>
	        		</div>
	        		
	        		
	        	</div> 
	        		<ReactCSSTransitionGroup
			          transitionName="zhezhao"    
			          transitionEnterTimeout={500}
			          transitionLeaveTimeout={500}
			        >
			      	{zhezhao}
		        	</ReactCSSTransitionGroup>
		        	
	        	<ReactCSSTransitionGroup
		          transitionName="ul" 
		          transitionEnterTimeout={500}
		          transitionLeaveTimeout={500}
		        >
		        	{ul}
		        </ReactCSSTransitionGroup>
		        
       	</div>
		)
	}
}
export default withRouter(Head)