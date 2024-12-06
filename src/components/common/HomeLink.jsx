import React from 'react';
import {Link} from "react-router-dom";

const HomeLink = () => {
  return (
    <div style={{marginBlock:50}}>
      <Link to='/'>Home</Link>
    </div>
)
  ;
};

export default HomeLink;