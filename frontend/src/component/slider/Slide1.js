import React, { Component } from 'react';
import Image from '../img/aateam1.jpg'

const Slide1= (props) => {
	let background = {
		height:'100%',
		backgroundImage: `url(${Image})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	}

	return <div style={background} className="slide"></div>
}

export default Slide1;
