import React from "react";
import Linkify from "react-linkify";

const ButtonMessage = props => {
  return (
    <div>
      <button className="sc-message--button">Yes</button>
      <button className="sc-message--button">No</button>
      <button className="sc-message--button">Goodbye</button>
    </div>
  );
};

export default ButtonMessage;
