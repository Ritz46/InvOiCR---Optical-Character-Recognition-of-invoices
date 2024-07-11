import React, { useState, useEffect } from 'react';
import './ImageUploader.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.css';
import { BsCardImage } from "react-icons/bs";
const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    subsidiary: '',
    documentNumber: '',
    billDate: '',
    GSTIN: '',
    invoiceNumber: '',
    tax_amount:''
  });

  useEffect(() => {
    if (result) {
      console.log(result);
      findFields(result)
    }
  }, [result]);

  useEffect(() => {
    if (result) {
      console.log(formData);
    }
  }, [formData]);

  const findFields = (text) => {
    const colonIndex = text.indexOf(':');
    const subsi = text.substring(0,colonIndex);

    const regex_GST = /GSTIN\s*:\s*([^\s]+)/;
    const match_GST = text.match(regex_GST);

    const regex_DocumentNo = /Document\s+No\s+([^\s]+)/;
    const match_Doc = text.match(regex_DocumentNo);

    const regex_billDAte = /Bill\s+Date\s+([^\s]+)/
    const match_billDate = text.match(regex_billDAte);

    const regex_InvoiceNumber = /Invoice\s+No\s+([^\s]+)/
    const match_Inv_num = text.match(regex_InvoiceNumber);


    const regex = /Rs\.\s*([^ ]+)/g;
    let match;
    let prices = [];
    
    while ((match = regex.exec(text)) !== null) {
      prices.push(match[1]);
    }

    const tax_amt = prices[1]

    setFormData({
      subsidiary: subsi,
      GSTIN : match_GST[1],
      billDate: match_billDate[1],
      documentNumber: match_Doc[1],
      invoiceNumber: match_Inv_num[1],
      tax_amount : tax_amt
    });
  }
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
      console.log(result);
      

    }
  };

  const handleUpload = async () => {
      try {
        const response = await fetch('http://localhost:7000/uploadFields', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'  // Set the Content-Type header to application/json
          },
          body: JSON.stringify(formData),  // Convert formData to JSON string
        });
        if (response.ok) {
          setFormData({
            subsidiary: '',
            documentNumber: '',
            billDate: '',
            GSTIN: '',
            invoiceNumber: '',
            tax_amount:''
          });
          
          alert('Uploaded to database successfully !');
          
        } else {
          console.error('Error uploading form:', response.statusText);
        }
      }
      catch (error) {
        console.error('Error:', error);
      }
    }







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
            <button className="btn" onClick={handleSubmit} >Extract Fields</button>
            {isLoading && (
        <div className="loading-spinner"></div>
      )}
          </div>

          <div className="pre-existing-section1">
            <h4 style={{marginBottom:'20px', color:'grey'}}>Fields will automatically update here</h4><hr></hr>
            <form>
              <div className="form-group">
              <label htmlFor="Subsidiary" style={{ textAlign: 'left' }}>Subsidiary</label>
                <input id="Subsidiary" value={formData.subsidiary || ''} onChange={(e) => setFormData({ ...formData, subsidiary: e.target.value })} />
                <label htmlFor="DocumentNumber" style={{textAlign:'left'}}>Document Number</label>
                <input id="DocumentNumber" value={formData.documentNumber || ''} onChange={(e)=> setFormData({...formData, documentNumber: e.target.value})}></input>
                <label htmlFor="BillDate" style={{textAlign:'left'}}>Bill Date</label>
                <input id="BillDate" value={formData.billDate || ''} onChange={(e)=> setFormData({...formData, billDate:e.target.value})}></input>
                <label htmlFor="InvoiceNumber" style={{textAlign:'left'}}>Invoice Number</label>
                <input id="InvoiceNumber" value={formData.invoiceNumber || ''} onChange={(e)=> setFormData({...formData, invoiceNumber:e.target.value})}></input>
                <label htmlFor="GSTIN" style={{textAlign:'left'}}>GSTIN</label>
                <input id="GSTIN" value={formData.GSTIN || ''} onChange={(e)=> setFormData({...formData, GSTIN:e.target.value})}></input>
                <label htmlFor="TaxAmt" style={{textAlign:'left'}}>Tax Amount</label>
                <input id="TaxAmt" value={formData.tax_amount|| ''} onChange={(e)=> setFormData({...formData, tax_amount:e.target.value})}></input>
                <button className="file-upload-btn" type="button" style={{marginTop:'30px'}} onClick={handleUpload}>
                    UPLOAD 
                </button>
                </div>
            </form>
          </div>
          {/* <div>
            {result && (
              <div>
              <div className="pre-existing-section1">
                <h4>EXTRACTED TEXT</h4><hr></hr>
                <p>{result}</p>
              </div>
              <button className="btn" style={{marginTop:'30px'}}>POST-PROCESS</button>
              </div>
              
            )}
          </div> */}
        </div>

        <div className="pre-existing-section">
          <h4>UPLOADED INVOICE</h4><hr></hr>
          {imageSrc ? (
            <img src={imageSrc} alt="Uploaded" className="img-fluid" />
          ) : (
            <div><p>Uploaded invoice will appear here</p>
            <BsCardImage style={{ fontSize: '50px', color: 'grey' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
