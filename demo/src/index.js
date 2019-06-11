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
         console.log('option was hit!!!')
          this._sendButton(json.output.generic[0]);
        } else if (json.output.generic[0].response_type === "text") {
          this._sendCarousel(json.output.generic[0]);
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


      Array.from(data.options, x =>
        buttons.push({
          text: x.label
        })
      )

      console.log('BUTTONS is', buttons)

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
              wine: [
                {
                  name: "2015 Frescobaldi Remole IGT",
                  price: 23.99,
                  img:
                    "https://www.finewinedelivery.co.nz/content/products/original/27061.jpg",
                  url: "https://www.finewinedelivery.co.nz"
                },
                {
                  name: "2016 Rocca delle Macie Chianti Classico DOCG",
                  price: 26.99,
                  img:
                    "https://www.finewinedelivery.co.nz/content/products/original/29467~1544125555.jpg",
                  url: "https://www.finewinedelivery.co.nz"
                },
                {
                  name: "2017 Frescobaldi Castiglioni Chianti DOCG",
                  price: 32.9,
                  img:
                    "https://www.finewinedelivery.co.nz/content/products/original/30622~1556078210.jpg",
                  url: "https://www.finewinedelivery.co.nz"
                }
              ]
            }
          }
        ]
      });
  }

  _buttonClick(data){
    console.log('button clicked')
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
        <TestArea
          onMessage={this._sendMessage.bind(this)}
          onButton={data => this._sendButton(data)}
          onCarousel={data => this._sendCarousel(data)}
        />
        <Launcher
          agentProfile={{
            teamName: "FWD Chat",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
          }}
          onButtonClick={this._buttonClick.bind(this)}
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
