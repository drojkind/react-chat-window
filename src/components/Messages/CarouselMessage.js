import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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
    const {wine} = this.props.data;
    return (
      <div style={{ width: 300, margin: "20px 0", height: 200 }}>
        <AliceCarousel
          mouseDragEnabled
          dotsDisabled
          buttonsDisabled
          slideToIndex={currentIndex}
        >
          {wine.map(data => (
            <div
              style={{
                textAlign: "center",
                textDecoration: "none",
                color: "black",
                underline: "none"
              }}
            >
              <a
                href={data.url}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "#263238"
                }}
              >
                <img
                  src={data.img}
                  onDragStart={handleOnDragStart}
                  style={{ height: 150 }}
                />
                <p style={{margin: 0}}>{data.name}</p>
                <b>${data.price}</b>
              </a>
            </div>
          ))}
        </AliceCarousel>
        <button
          className="roundButton"
          onClick={this.slidePrevPage}
          style={{
            position: "relative",
            float: "left",
            marginTop: "-150px",
            cursor: "pointer"
          }}
        >
          <img
            src={LeftArrow}
            style={{ width: "6px", margin: "5px 0 0 0" }}
          />
        </button>
        <button
          className="roundButton"
          onClick={this.slideNextPage}
          style={{
            position: "relative",
            float: "right",
            marginTop: "-150px",
            cursor: "pointer"
          }}
        >
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
