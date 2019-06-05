import React from "react";
import Linkify from "react-linkify";

const ButtonMessage = props => {
    console.log(props)
  return (
    <div>
      <div className="sc-message--text" style={{ marginBottom: 20 }}>
        {
          <Linkify properties={{ target: "_blank" }}>
            {props.data.text}
          </Linkify>
        }
      </div>
      {props.data.button.map(data => 
        <button className="sc-message--button">{data.text}</button>
      )}
    </div>
  );
};

export default ButtonMessage;
