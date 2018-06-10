import React, { Component } from 'react';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import RightArrow from './arrows/RightArrow';
import LeftArrow from './arrows/LeftArrow';
require('./style.scss')

export default class Slider extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          slideCount: 1
        }

        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }
    
    render() {
        let styles = {
            height:200,
        }
        
        return (
            <div style={styles} className="slider">
                {/* Slides go here */}
                { this.state.slideCount === 1 ? <Slide1 /> : null }
                { this.state.slideCount === 2 ? <Slide2 /> : null }
                { this.state.slideCount === 3 ? <Slide3 /> : null }
                
                <RightArrow nextSlide={this.nextSlide} />
                <LeftArrow previousSlide={this.previousSlide} />
            </div>
        );
    }

    nextSlide() {
        if(this.state.slideCount < 3)
            this.setState({ slideCount: this.state.slideCount + 1 })
        else
            this.setState({ slideCount: 1 })
    }
  
    previousSlide() {
        if(this.state.slideCount > 1)
            this.setState({ slideCount: this.state.slideCount - 1 })
        else
            this.setState({ slideCount: 3 })
    }
}