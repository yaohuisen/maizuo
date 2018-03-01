import React, {Component} from 'react';
import "../style/List.css"
import axios from "axios";
import {Link} from "react-router-dom"
import {withRouter} from "react-router-dom";
 class List extends Component {
	constructor(){
		super();
		this.state={
			upList : [],
			downList : []
		}
		this.getUpList = this.getUpList.bind(this);
		this.getDownList = this.getDownList.bind(this);
		this.sendId = this.sendId.bind(this);
		this.getMore = this.getMore.bind(this);
	}
	componentDidMount(){
		this.getUpList()
		this.getDownList()
	}
	getUpList(){
		axios.get("/v4/api/film/now-playing?__t=1519639070852&page=1&count=5")
		.then((res)=>{
//			console.log(res);
			this.setState({
				upList : res.data.data.films
			})
		})
	}
	getDownList(){
		axios.get("/v4/api/film/coming-soon?__t=1519639070856&page=1&count=3")
		.then((res)=>{
			console.log(res)
			this.setState({
				downList : res.data.data.films
			})
		})
	}
	sendId(id){
		this.props.history.push("/detail/"+id)
		
	
	}
	getMore(id){
		this.props.history.push("/more"+id)
	}
	render(){
		return(
			<div className="List">
				<ul className="ull">
					{
						this.state.upList.map((item,index)=>{
							return (
							<li key={item.id}
								onClick={()=>this.sendId(item.id)}
							>
									<dl>
										<dt>
											<img src={item.cover.origin}/>
										</dt>
										<dd>
											<div className="infor">
												<h4>{item.name}</h4>
												<p>{item.intro}</p>
											</div>
											<div className="core">
												<span>{item.grade}</span>
											</div>
										</dd>
									</dl>
								</li>
							
								
							)
							
						})
					}
				</ul>
				<div className="moreButton"
					onClick={()=>this.getMore("/first")}
				>更多热映电影</div>
				
				<div className="line">
					<span>即将上映</span>
				</div>
				<ul className="ull">
					{
						this.state.downList.map((item,index)=>{
							return(
								<li key={item.id}
									onClick={()=>this.sendId(item.id)}
								>
									<dl>
										<dt>
											<img src={item.cover.origin}/>
										</dt>
										<dd>
											<div className="infor">
												<h4>{item.name}</h4>
										
											</div>
											<div className="core">
												<span>{item.grade}</span>
											</div>
										</dd>
									</dl>								
								</li>
							)
						})
					}
				</ul>
				<div className="moreButton"
					onClick={()=>this.getMore("/second")}
				>更多即将上映电影</div>
			</div>			
		)

	}
}
export default withRouter(List);