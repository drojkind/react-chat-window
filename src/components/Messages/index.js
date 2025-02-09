import React, { Component } from 'react'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import FileMessage from './FileMessage'
import CarouselMessage from "./CarouselMessage";
import ButtonMessage from "./ButtonMessage";


class Message extends Component {

  _renderMessageOfType(type) {
    switch (type) {
      case "text":
        return <TextMessage {...this.props.message}n />;
      case "emoji":
        return <EmojiMessage {...this.props.message} />;
      case "file":
        return <FileMessage {...this.props.message} />;
      case "carousel":
        return <CarouselMessage {...this.props.message} />;
      case "button":
        return <ButtonMessage {...this.props.message} onButtonClick={(data) => this.props.onButtonClick(data)}  />;
      default:
        console.error(
          `Attempting to load message with unsupported file type '${type}'`
        );
    }
  }

  render () {
    let contentClassList = [
      "sc-message--content",
      (this.props.message.author === "me" ? "sent" : "received")
    ];
    return (
      <div className="sc-message">
        <div className={contentClassList.join(" ")}>
          {this._renderMessageOfType(this.props.message.type)}
        </div>
      </div>
    );
  }
}

export default Message