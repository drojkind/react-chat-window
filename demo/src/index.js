import React, {Component} from 'react'
import {render} from 'react-dom'
import {Launcher} from '../../src'
import messageHistory from './messageHistory';
import TestArea from './TestArea';
import Header from './Header';
import './../assets/styles'



class Demo extends Component {
  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [
        ...this.state.messageList,
        {
          type: "file",
          author: "me",
          data: {
            url: objectURL,
            fileName: fileList[0].name
          }
        }
      ]
    });
  }

  _sendMessage(text) {
    if (text.length > 0) {
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
            data: { text }
          }
        ]
      });
    }
  }

  _sendButton(text) {
    if (text.length > 0) {
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
              text: "How fruity do you like your wine?",
              button: [{ text: "Medium Fruit" }, { text: "Full Fruit" }]
            }
          }
        ]
      });
    }
  }

  _sendCarousel(text) {
    if (text.length > 0) {
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
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          onFilesSelected={this._onFilesSelected.bind(this)}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this._handleClick.bind(this)}
          isOpen={this.state.isOpen}
          showEmoji
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
