import React from 'react';
import './Home.css';
import sampleImage from './images/home_image.png';
import Invoicr_image from './images/invOiCR.png'

const Home = () => {
    const handleClick = () => {
        window.location.href = '/OCR';
    };
  return (
    <div className="home-container">
      <div className="image-container">
        <img src={sampleImage} alt="Description of the image" className="home-image" />
      </div>
      <div className="text-container">
        <h1><div>Welcome to</div> <img src={Invoicr_image} alt="Description of the image" className="home-image" /></h1>
        <p>
          We specialize in extracting text from invoices using advanced OCR technology.
          Our service is fast, reliable, and easy to use. Let us help you streamline
          your data processing needs.
          <p className='myName'>- Rithick</p>
        </p>
        <button className='btn' onClick={handleClick}>Try out InvOiCR</button>
      </div>
    </div>
  );
}

export default Home;
