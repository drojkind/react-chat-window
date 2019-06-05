import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Linkify from "react-linkify";

import LeftArrow from '../../assets/arrow-left.svg';
import RightArrow from "../../assets/arrow-right.svg";

class CarouselMessage extends React.Component {
  state = {
    currentIndex: 0,
    itemsInSlide: 2
  };

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - 1;
    if(this.state.currentIndex !== 0){
       this.setState({ currentIndex });
    } 
  };

  slideNextPage = () => {
    let currentIndex = this.state.currentIndex + 1;
    if(currentIndex > this.state.itemsInSlide){
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ currentIndex });
    }
  };
  render() {
    const handleOnDragStart = e => e.preventDefault();
    const { currentIndex } = this.state;
    const {data} = this.props;
    return (
      <div style={{ width: 220 }}>
        <AliceCarousel
          mouseDragEnabled
          dotsDisabled
          buttonsDisabled
          slideToIndex={currentIndex}
        >
          <div style={{ textAlign: "center", textDecoration: "none" }}>
            <a href="https://finewinedelivery.co.nz" target="_blank">
              <img
                src="https://www.finewinedelivery.co.nz/content/products/original/27061.jpg"
                onDragStart={handleOnDragStart}
                style={{ height: 150 }}
              />
              <p>2015 Frescobaldi Remole IGT</p>
              <b>$23.99</b>
            </a>
          </div>
          <div style={{ textAlign: "center", textDecoration: "none" }}>
            <a href="https://finewinedelivery.co.nz" target="_blank">
              <img
                src="https://www.finewinedelivery.co.nz/content/products/original/29467~1544125555.jpg"
                onDragStart={handleOnDragStart}
                style={{ height: 150 }}
              />
              <p>2016 Rocca delle Macie Chianti Classico DOCG</p>
              <b>$26.99</b>
            </a>
          </div>
          <div style={{ textAlign: "center", textDecoration: "none" }}>
            <a href="https://finewinedelivery.co.nz" target="_blank">
              <img
                src="https://www.finewinedelivery.co.nz/content/products/original/30622~1556078210.jpg"
                onDragStart={handleOnDragStart}
                style={{ height: 150 }}
              />
              <p>2017 Frescobaldi Castiglioni Chianti DOCG</p>
              <b>$32.90</b>
            </a>
          </div>
        </AliceCarousel>
        <button className="roundButton" onClick={this.slidePrevPage}>
          <img
            src={LeftArrow}
            style={{ width: "6px", margin: "5px 0 0 0" }}
          />
        </button>
        <button className="roundButton" onClick={this.slideNextPage}>
          <img
            src={RightArrow}
            style={{ width: "6px", margin: "5px 0 0 0" }}
          />
        </button>
      </div>
    );
  }
};

export default CarouselMessage;
