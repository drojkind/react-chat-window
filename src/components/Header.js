import React, { Component } from 'react';
import closeIcon from './../assets/close-icon.png';
import chatIcon from "./../assets/chat-icon.svg";


class Header extends Component {

  render() {
    return (
      <div className="sc-header">
        <img className="sc-header--img" src={chatIcon} alt="" style={{height: 40}}/>
        <div className="sc-header--team-name"> {this.props.teamName} </div>
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
  }
}

export default Header;
