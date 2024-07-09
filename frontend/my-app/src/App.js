import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ImageUploader from './components/ImageUploader';
import Navbar1 from './components/Navbar1';
import Home from './components/Home';
import ContactUs from './components/ContactUs';

function App() {
  React.useEffect(() => {
    // Apply styles to the html and body elements
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#f4f4f9';
  }, []);
  return (
    <div className="App">
      <Router>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/OCR" element={<ImageUploader />} />
        <Route path="/contact"element={<ContactUs />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
