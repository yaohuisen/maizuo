import React, {Component} from 'react';
import "../style/Section.css"
import Banner from "./Banner";
import List from "./List";
export default class Section extends Component {
	render(){
		return (
			<div className="sec">
				{<Banner/>}
				{<List/>}
			</div>
		)
	}
}
