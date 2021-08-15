import React from "react";
// import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    // <Spinner animation='border' role='status' className='spinner'>
    //   <span className='sr-only'>Loading...</span>
    // </Spinner>
    <div className="sk-wave sk-center">
      <div className="sk-wave-rect"></div>
      <div className="sk-wave-rect"></div>
      <div className="sk-wave-rect"></div>
      <div className="sk-wave-rect"></div>
      <div className="sk-wave-rect"></div>
    </div>
  );
};

export default Loader;
