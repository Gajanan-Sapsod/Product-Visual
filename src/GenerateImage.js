import React, { useState } from 'react';

function GenerateImage() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleGenerateImage = async () => {
        if (!prompt) {
            alert("Please enter a prompt.");
            return;
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        try {
            const response = await fetch('http://127.0.0.1:5000/generate_image', {
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
            <input
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter description"
            />
            <button onClick={handleGenerateImage}>Generate Image</button>
            {imageUrl && (
                <div>
                    <h3>Generated Image:</h3>
                    <img src={imageUrl} alt="Generated" />
                </div>
            )}
        </div>
    );
}

export default GenerateImage;
