import React, { useState } from 'react';

function ImageEdit() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedMask, setSelectedMask] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleMaskChange = (event) => {
        setSelectedMask(event.target.files[0]);
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleUpload = async () => {
        if (!selectedImage || !selectedMask || !prompt) {
            alert("Please select both image and mask files and provide a prompt.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('mask', selectedMask);
        formData.append('prompt', prompt);

        try {
           
            const response = await fetch('http://127.0.0.1:5000/create_edit', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setImageUrl(data.image_url);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange}  />
            <input type="file" onChange={handleMaskChange} />
            <input
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter description"
            />
            <button onClick={handleUpload}>Upload</button>
            {imageUrl && (
                <div>
                    <h3>Edited Image:</h3>
                    <img src={imageUrl} alt="Edited" />
                </div>
            )}
        </div>
    );
}

export default ImageEdit;
