import React, { Component } from 'react'

class TestArea extends Component {
  render () {
    return (
      <div className="demo-test-area--wrapper">
        <form
          className="demo-test-area"
          onSubmit={e => {
            e.preventDefault();
            this.props.onMessage(this.textArea.value);
            this.textArea.value = "";
          }}
        >
          <div className="demo-test-area--preamble">
            Test the chat window by sending a message:
          </div>
          <textarea
            ref={e => {
              this.textArea = e;
            }}
            className="demo-test-area--text"
            placeholder="Write a test message...."
          />
          <button className="demo-test-area--button">
            {" "}
            Send Message!{" "}
          </button>
        </form>
        <div className="demo-test-area">
          <p />
          <button
            className="demo-test-area--button"
            onClick={() => this.props.onButton("hello")}
          >
            {" "}
            Send Buttons!{" "}
          </button>
          <p />
          <button
            className="demo-test-area--button"
            onClick={() => this.props.onCarousel('carousel')}
          >
            {" "}
            Send Carousel!{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default TestArea
