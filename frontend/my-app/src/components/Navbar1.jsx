import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar1.css';
import 'bootstrap/dist/css/bootstrap.css';
import Invoicr_image from './images/invOiCR.png'
const Navbar1 = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Inv<p style={{display:'inline', color:'#8c52ff'}}>O</p>i<p style={{display:'inline', color:'#8c52ff'}}>CR</p></Link>
        {/* <p style={{textAlign:'left', fontSize:'14px'}}>- RITHICK</p> */}
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to="/OCR">OCR</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar1;
