import React, { useState, useEffect } from "react";
import axios from "axios";

const Action = (props) => {
  return (
    <>
      <h3>Action Step</h3>
      <p>{props.action.description}</p>
      <label>Notes:</label>
      <p>{props.action.notes}</p>
    </>
  );
};

export default Action;
