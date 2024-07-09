import React, { useState, useEffect } from 'react';
import './ImageUploader.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.css';
import { BsCardImage } from "react-icons/bs";
const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [result, setResult] = useState('');


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setImageTitle(file.name);
    } else {
      removeUpload();
    }
  };

  const removeUpload = () => {
    setImageSrc(null);
    setImageTitle('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('image-dropping');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('image-dropping');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setImageTitle(file.name);
    }
    e.currentTarget.classList.remove('image-dropping');
  };


  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!imageSrc) {
      alert('No image uploaded');
      return;
    }

    const fileInput = document.querySelector('.file-upload-input');
    const file = fileInput.files[0];

    if (!file) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    console.log(file);

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:7000/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false); 
      

    }
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <div className="container">
        <div className='left-container'>

        <div className="file-upload">
          <button className="file-upload-btn" type="button" onClick={() => document.querySelector('.file-upload-input').click()}>
            Add Image
          </button>

          <div className={`image-upload-wrap ${imageSrc ? 'file-uploaded' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}  onClick={() => document.querySelector('.file-upload-input').click()}>
            <input
              className="file-upload-input"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className="drag-text">
              <h3>Drag and drop a file or click to select</h3>
            </div>
          </div>
          

          
          
        </div>
        <div>
            <button className="btn" onClick={handleSubmit} >Extract Text</button>
            {isLoading && (
        <div className="loading-spinner"></div>
      )}
          </div>
          <div>
            {result && (
              <div>
              <div className="pre-existing-section1">
                <h4>EXTRACTED TEXT</h4><hr></hr>
                <p>{result}</p>
              </div>
              <button className="btn" style={{marginTop:'30px'}}>POST-PROCESS</button>
              </div>
              
            )}
          </div>
        </div>

        <div className="pre-existing-section">
          <h4>UPLOADED IMAGE</h4><hr></hr>
          {imageSrc ? (
            <img src={imageSrc} alt="Uploaded" className="img-fluid" />
          ) : (
            <div><p>Uploaded image will appear here</p>
            <BsCardImage style={{ fontSize: '50px', color: 'grey' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
