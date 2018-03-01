import React, {Component} from 'react';
import axios from "axios"
import "../style/City.css";
import Head from "./Head"
import $ from "jquery";
import {withRouter,Link} from "react-router-dom";
class City extends Component {
	constructor(){
		super();
		this.state = {
			ABC : ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"],
			cityData : [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			city:"北京"
		},
		
		this.getCity = this.getCity.bind(this);
		this.changeCity = this.changeCity.bind(this);
	}
	componentDidMount(){
		this.getCity();
	
			
		
			$('a[href^="#"]').click(function(e){
	            $('.main').animate({scrollTop: $(this.hash).offset().top-$("h3").height()+$(".main").scrollTop()}, 300);
	        });			
	

	}
	getCity(){
		axios.get("/v4/api/city?__t=1519869162725")
		.then((res)=>{
			var cities = res.data.data.cities;
			var len = cities.length;
			var daArr = [];
			for(var j=0; j<this.state.ABC.length; j++ ){
				var sArr = [];
				for(var i=0; i<len; i++){
					if(this.state.ABC[j] == cities[i].pinyin.charAt(0)){
						sArr.push(cities[i].name)
					}
				}
				daArr.push(sArr);
			}
				console.log(daArr)
			this.setState({
				cityData : daArr
			})
		})
	}
	changeCity(city){
		this.setState({
			city : city
		})		
	}
	render(){
		return (
			<div className="App">
				{<Head title="选择城市" city={this.state.city}/>}
				<div className="main">
					<div className="cityTile">
						<h3 className="hCity">
							GPS定位你所在的城市
						</h3>
						<ul>
							<li>北京</li>
						</ul>
					</div>
					<div className="cityTile">
						<h3 className="hCity">
							热门城市
						</h3>
						<ul>
							<li>北京</li>
							<li>上海</li>
							<li>广州</li>
							<li>深圳</li>
						</ul>
					</div>
					<div className="cityTile">
						<h3 className="hCity">
							按字母排序
						</h3>
						<ul>
							{
								this.state.ABC.map(function(item, index){
									return(
										<li key={index}>
											<a href={"#"+item}>{item}</a>
										</li>
									)
								})
							}
						</ul>
					</div>	
					
					{
						this.state.ABC.map((item,index)=>{
							return (
								<div className="cityTile" key={index}>
									<h3 id={item} name={item} className="hCity">
										{item}
									</h3>
									<ul>
										{
											this.state.cityData[index].map((it,ins)=>{
												return(
													<li key={ins} onClick={()=>this.changeCity(it)}>
														{it}
													</li>
												)
											})
										}
									</ul>
								</div>
							)
						})
					}
				</div>
			</div>			
		)

	}
}
export default withRouter(City)
