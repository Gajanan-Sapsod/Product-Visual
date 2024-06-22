import React, { useState } from 'react';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedImageUrl, setProcessedImageUrl] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setProcessedImageUrl(`http://127.0.0.1:5000/processed/${data.filename}`);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {processedImageUrl && (
                <div>
                    <h3>Processed Image:</h3>

                    
                    <img src={processedImageUrl} alt="Processed" width="300" height="300"/>
                   
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
