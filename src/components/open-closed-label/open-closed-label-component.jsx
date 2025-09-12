import React from "react";
import "./styles.css";

const OpenClosedLabel = ({isOpen}) => {

  var labelClass = "label-container "
  labelClass += isOpen ? "open-label" : "closed-label"

  var labelText = isOpen ? "Open" : "Closed"

  return (
    <div className={labelClass}>
        {labelText}
    </div>
  );
};

export default OpenClosedLabel;
