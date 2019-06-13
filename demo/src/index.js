import React, { Component } from "react";
import { render } from "react-dom";
import { Launcher } from "../../src";
import messageHistory from "./messageHistory";
import TestArea from "./TestArea";
import Header from "./Header";
import "./../assets/styles";

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
      context: {}
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
    this.sendMessage(message);
  }

  componentWillMount() {
    this.firstLoad();
  }

  firstLoad = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    fetch("http://127.0.0.1:1337/api/message", options)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ context: json.context });
      })
      .catch(error => {});
  };

  sendMessage = text => {
    console.log('THIS IS THE TEXRT', text)
    // Build request payload
    var payloadToWatson = {};

    payloadToWatson.input = {
      text: text.data.text
    };

    payloadToWatson.context = this.state.context;

    const options = {
      body: JSON.stringify(payloadToWatson),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    };

    fetch("http://127.0.0.1:1337/api/message", options)
      .then(response => {
        return response.json();
      })
      .then(json => {
        // Updates to latest context
        this.setState({ context: json.context });
        if (json.output.generic[0].response_type === "option") {
          this._sendButton(json.output.generic[0]);
          // We need to be more specific for this check. As text type is used for other responses as well...
        } else if (json.output.generic[0].response_type === "text") {
          this._sendCarousel(json);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  _sendMessage(data) {
    if (data.length > 0) {
      const newMessagesCount = this.state.isOpen
        ? this.state.newMessagesCount
        : this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { data }
          }
        ]
      });
    }
  }

  _sendButton(data) {
    let buttons = [];
    //Creates an array from the names of buttons received...
    Array.from(data.options, x =>
      buttons.push({
        text: x.label
      })
    );

    // const buttons = data.options.map(data => text: data.label);
    const newMessagesCount = this.state.isOpen
      ? this.state.newMessagesCount
      : this.state.newMessagesCount + 1;
    this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [
        ...this.state.messageList,
        {
          type: "button",
          author: "them",
          data: {
            text: data.title,
            button: buttons
          }
        }
      ]
    });
  }

  _sendCarousel(data) {
    console.log('carousel data', data)
    console.log(data.context.wds.list_products)
    console.log(data.context.wds.list_products);

    console.log(typeof data.context.wds.list_products);
    const newMessagesCount = this.state.isOpen
      ? this.state.newMessagesCount
      : this.state.newMessagesCount + 1;
    this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [
        ...this.state.messageList,
        {
          type: "carousel",
          author: "them",
          data: {
            wine: data.context.wds.list_products
          } 
        }
      ]
    });
  }

  _buttonClick(data) {
    const newMessagesCount = this.state.isOpen
      ? this.state.newMessagesCount
      : this.state.newMessagesCount + 1;
    this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [
        ...this.state.messageList,
        {
          author: "me",
          type: "text",
          data: { text: data }
        }
      ]
    });

    this.sendMessage({
      author: "me",
      type: "text",
      data: { text: data }
    });
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Launcher
          agentProfile={{
            teamName: "FWD Chat",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
          }}
          onButtonClick={(data) => this._buttonClick(data)}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this._handleClick.bind(this)}
          isOpen={this.state.isOpen}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
