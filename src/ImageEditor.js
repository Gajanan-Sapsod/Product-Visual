import React, { useState } from 'react';
import axios from 'axios';

const ImageEditor = () => {
  const [productImage, setProductImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  const handleProductImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleBackgroundImageChange = (e) => {
    setBackgroundImage(e.target.files[0]);
  };

  const handleImageSubmit = async () => {
    if (!productImage || !backgroundImage) {
      alert('Please upload both a product image and a background image.');
      return;
    }

    const formData = new FormData();
    formData.append('productImage', productImage);
    formData.append('backgroundImage', backgroundImage);

    try {
      const response = await axios.post('http://localhost:5000/merge-images', formData, {
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);
      setFinalImage(imageUrl);
    } catch (error) {
      console.error('Error merging images:', error);
    }
  };

  return (
    <div className="image-editor">
      <h5>Upload Product Image and Background Image</h5>
      <div className='my-12 mx-12 p-4'>
        <label htmlFor="productImage">Upload Product Image:</label>
        <input type="file" id="productImage" onChange={handleProductImageChange} />
          </div>
        
      <div className='my-12 mx-12 p-4'>
        <label htmlFor="backgroundImage">Upload Background Image:</label>
        <input type="file" id="backgroundImage" onChange={handleBackgroundImageChange} />
      </div>
      <button onClick={handleImageSubmit}>Merge Images</button>
      {finalImage && (
        <div className="final-image">
          <h3>Final Image:</h3>
          <img src={finalImage} alt="Final Product" />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
