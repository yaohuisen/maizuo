import React, {Component} from 'react';
import "../style/Detail.css";
import axios from "axios";
import Head from "./Head";
export default class Detail extends Component {
	constructor(){
		super();
		this.state = {
			data : []
		}
		this.getDetail = this.getDetail.bind(this);
	}
	componentDidMount(){
		this.getDetail();
	}
	getDetail(){
		var id = this.props.match.params.fid
		axios.get(`/v4/api/film/${id}?__t=1519650173832"`)
		.then((res)=>{
			console.log(res)
			this.setState({
				data : res.data.data.film
			})
		})
	}
	buy(id){
		this.props.history.push("/cinema/"+id)
	}
	render (){
		var img,li
		
		if(this.state.data.actors){
			
			li  =<li>
					<span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:</span>
							{
								this.state.data.actors.map((item,index)=>{
									return(
										<span key={index} className="s1">{item.name}</span>
									)
								})
							}
				</li>
		}else{
			
			li = null
		}
		if(this.state.data.cover){
			 img = <img src={this.state.data.cover.origin}/>
		}else{
			img = null;
		}
		return(
			<div className="App">
				{<Head title={this.state.data.name}/>}
				<div className="information">
					<div className="img">
						{img}
					</div>
					<h1>影片简介</h1>
					
					<ul className='u1'>
						<li>
							<span>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:</span>
							<span>{this.state.data.director}</span>
							
						</li>
						{li}
						<li>
							<span>地区语言:</span>
							<span>{this.state.data.language}</span>
						</li>
						<li>
							<span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</span>
							<span>{this.state.data.category}</span>
							
						</li>
						<li>
							<span>上映日期</span>
							<span></span>
						</li>
						<li>
							<span>{this.state.data.synopsis}</span>
						</li>
					</ul>
					<button className="buy" onClick={()=>this.buy(this.props.match.params.fid)}>立即购票</button>
				</div>
				
			</div>
		)
		
	}
}
