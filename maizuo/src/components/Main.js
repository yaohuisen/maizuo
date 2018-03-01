import React, {Component} from 'react';
import {connect} from "react-redux";
import Head from "./Head"
import '../font/iconfont.css' 
import Section from "./Section"

class Main extends Component {
	constructor(){
		super();
		
	}
	componentWillMount(){
		this.props.titles("卖座电影")
		
	}

  render() { 	
		
    return (
      <div className="App">
        {<Head title={this.props.title}/>}
      	{<Section/>} 
      </div>
     
    );
  }
}
const mapStateToProps = (state, props)=>{
	return {
		title : state.title
	}
}

const mapDispatchToProps =(dispatch, props) =>  {
	return {
		titles:function(str){
			dispatch({
				type:"ADD_TO_TITLE",
				payload:str
			})
		},

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);