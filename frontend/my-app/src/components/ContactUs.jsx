import React, { useState } from 'react';
import './ContactUs.css'; // Import CSS file for styling

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data:', formData);
    // You can add further logic to send data to a server, etc.
    // Clear form after submission if needed
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    try {
      const response = await fetch('http://localhost:7000/contact-Us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // Set the Content-Type header to application/json
        },
        body: JSON.stringify(formData),  // Convert formData to JSON string
      });


      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error uploading form:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading form:', error);
    } 
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            rows="5" 
            required 
          />
        </div>
        <button type="submit" className='btn' onSubmit={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
