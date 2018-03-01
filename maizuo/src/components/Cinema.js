import React, {Component} from 'react';
import axios from "axios";
import Head from "./Head"
import "../style/Cinema.css"
import $ from "jquery"
export default class Cinema extends Component {
	constructor(){
		super();
		this.state = {
			data : [],
			name:"",
			area:[]

		}
		this.getData = this.getData.bind(this);
		this.getName = this.getName.bind(this);
		this.onOff = this.onOff.bind(this);
	}
	componentDidMount(){
		
		this.getName();
		this.getData();
		setTimeout(()=>{
			this.onOff()
		},1000)
		
	}
	getData(){
		var str 
		var id = this.props.match.params.fid;
		if(id=="0"){
			str = `/v4/api/cinema?__t=${new Date().getTime()}`
		}else{
			str = `/v4/api/film/${id}/cinema?__t=${new Date().getTime()}`
		}
		axios.get(str)
		.then((res)=>{
			var len = res.data.data.cinemas.length
			for(var i = 0;i <len; i++){
				this.state.area.push(res.data.data.cinemas[i].district.name)
			}
			
			this.state.area = [...new Set(this.state.area)]
	//		console.log(this.state.area);
			var arr = [];
			for(var i = 0; i < this.state.area.length; i++){
				var newArr = [];
				for(var j = 0;j < len;j ++){
					if(this.state.area[i] == res.data.data.cinemas[j].district.name){
						newArr.push(res.data.data.cinemas[j])
					}
				}
				arr.push(newArr)
			}
			console.log(arr)
			this.setState({
		
				area : arr,
				data : res.data.data.cinemas
			})
		})
	}
	getName(){
		
		var id = this.props.match.params.fid;
		if(id == "0"){
				this.setState({
					name:"全部影院"
				})			
		}else{
			axios.get(`/v4/api/film/${id}?__t=1519717794791`)
			.then((res)=>{
				this.setState({
					name:res.data.data.film.name 
				})
			})			
		}

	}
	onOff(){
			$("ul").eq(0).css("display","block")
		
			$("h3").click(function(){
				if($(this).siblings("ul").css("display") == "none"){
					$(this).siblings("ul").css("display","block")
				}else{
					$(this).siblings("ul").css("display","none")
				}
				
			})			


	}
	render(){
		

		
		return (
			<div className="App">
				{<Head title={this.state.name}/>}
				<div className="section">
					{
						this.state.area.map((item, index)=>{
							return(
									<div className="t" key={index}>
										<h3>{item[0].district.name}</h3>
							<ul>	
							{
								item.map((it,ins)=>{
								
									return(	
										<li key={ins}>
											<dl>
												<dt>
													<h2>{it.name}</h2>
													<p>{it.address}</p>
													<p>{"剩余"+(it.avaliableSchedule||2)+"场" }</p>
												</dt>
												<dd>
													<span>{it.minimumPrice}</span>
												</dd>
											</dl>
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
