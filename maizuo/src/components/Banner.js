import React, {Component} from 'react';
import "../style/banner.css";

import Swiper from "swiper";
import "../style/swiper.min.css";
import axios from "axios"
export default class Banner extends Component {
	constructor(){
		super()
		this.state = {
			films : [],
			n: 0
		}
		this.banner = this.banner.bind(this);
		this.autoplays = this.autoplays.bind(this);
//		this.fn = this.fn.bind(this);
	}
	componentDidMount(){
		
		this.banner();
		setTimeout(()=>{
			this.autoplays()
		},800)
		
	}
	autoplays(){
		 var mySwiper = new Swiper ('.swiper-container', {
		    autoplay:true,
		    loop: true,
		  })
	}
	banner(){
		axios.get("/v4/api/billboard/home?__t=1519639070848")
		.then((res)=>{
			this.setState({	
				films : res.data.data.billboards	
				
			})
			
		})
	}

	render(){
//		console.log(this.state.films)
		var swiper;
		if(this.state.films){
			swiper =  <div className="swiper-wrapper">
				    
				    {
				    	this.state.films.map((item, index)=>{
				    		return(
				    			
				    			<div className="swiper-slide" key={item.id}>
				    				<img src={item.imageUrl}/>
				    				
				    				
				    			</div>
				    			
				    			
				    		)
				    	})
				    }

				    </div>		
		}else{
			swiper = null
		}
		return(
			<div className="banner">
				<div className="swiper-container">

					{swiper}
			    </div>
			</div>
		)
	}
}
