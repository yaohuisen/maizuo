import React, {Component} from 'react';
import axios from "axios";
import "../style/NowPlaying.css";
import $ from "jquery";
import '../style/antd-mobile.css';
import LazyLoad from 'react-lazy-load';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

export default class NowPlaying extends React.Component {
	constructor(){
		super(); 
		this.state={
			data:[],
			page : 1
		}
		this.getFilmsData = this.getFilmsData.bind(this);
		this.gotoDetail = this.gotoDetail.bind(this)	
		this.getPage = this.getPage.bind(this);		
	}
	componentDidMount(){
		this.getFilmsData();
		this.getPage()
		 Toast.loading('Loading...', 30, () => {
	      console.log('Load complete !!!');
	   	 });
		
		 setTimeout(() => {
	      Toast.hide();
	    }, 2000);
		
	}
	getPage (){
		var that=this
		
			document.getElementsByClassName("filmsWrap")[0].onscroll = function(){
			let clientHeight = document.documentElement.clientHeight;
			
			var scrollTop = this.scrollTop
			console.log(this.scrollHeight)
			if((scrollTop + clientHeight) >= this.scrollHeight *0.8){
				that.state.page++;
				if(that.state.page<=6){
					that.getFilmsData();
				}
				
			}			
		}
	}	
	getFilmsData(){
		axios.get(`/v4/api/film/now-playing?page=${this.state.page}&count=7`)
		.then((res)=>{
			console.log(res)
			
			var data = this.state.data.concat(res.data.data.films)
			this.setState({
				data : data
			})
		})
	}
	gotoDetail(id){
		this.props.history.push("/detail/"+id)
	}
	render(){
		return (
			<div className="filmsList" >
				<ul>
					{
						this.state.data.map((item,index)=>{
							return(
								<li key={item.id}
								onClick={()=>this.gotoDetail(item.id)}>
									<dl>
										<dt>
											<LazyLoad height={84}>	
											 	<img src={item.cover.origin}/>
											 </LazyLoad>
										</dt>
										<dd>
											<div className="t1 t">
												<h3>{item.name}</h3>
												<span>{item.grade}</span>
											</div>
											<div className="t2 t">
												<p>{item.intro}</p>
											</div>
											<div className="t3 t">
												<p>11家影院上映</p>
												<span>{item.watchCount}人购票</span>
											</div>
										</dd>
									</dl>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}
