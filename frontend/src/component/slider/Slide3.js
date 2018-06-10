import React, { Component } from 'react';
import Image from '../img/tower.jpg'

const Slide3= (props) => {
  let background = {
    height:'100%',
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return <div style={background} className="slide"></div>
}

export default Slide3;
