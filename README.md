# Product Image Processing Application

This project provides a set of tools to help sellers enhance their product visuals by offering functionalities like background removal, image generation based on prompts, and merging product images with different backgrounds. The frontend is built with React, while the backend is implemented using Flask.

## Features

1. **Background Removal**: Upload a product image, remove its background, and save the processed image.
2. **Image Generation**: Generate images based on user prompts using AI.
3. **Background Addition**: Merge a product image with a chosen background to create visually appealing product photos.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Flask, Python
- **Image Processing**: Pillow (PIL), `rembg` for background removal
- **AI Integration**: OpenAI API for image generation

## Setup and Installation

### Prerequisites

- Node.js and npm
- Python 3.x
- Flask
- Virtual environment (optional but recommended)

### Backend Setup

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/your-repo/product-image-processing.git
    cd product-image-processing/backend
    ```

2. **Create a Virtual Environment** (optional):
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4. **Run the Flask Server**:
    ```sh
    python app.py
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**:
    ```sh
    cd ../frontend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the React Development Server**:
    ```sh
    npm start
    ```

## Usage

### Background Removal

1. **Upload Product Image**:
    - Navigate to the background removal section on the frontend.
    - Upload your product image.
    - The backend processes the image to remove the background and returns the processed image.

### Image Generation

1. **Generate Image Using AI**:
    - Navigate to the image generation section on the frontend.
    - Enter a prompt describing the product.
    - Submit the form to generate an image based on the prompt.

### Background Addition

1. **Merge Product Image with Background**:
    - Navigate to the background addition section on the frontend.
    - Upload your product image and a background image.
    - Submit the images to merge them and get the final image with the chosen background.

## API Endpoints

### `/upload` (POST)
- **Description**: Upload a product image and remove its background.
- **Form Data**:
  - `file`: The product image file.
- **Response**: A JSON object containing the filename of the processed image.

### `/merge-images` (POST)
- **Description**: Merge a product image with a background image.
- **Form Data**:
  - `productImage`: The product image file.
  - `backgroundImage`: The background image file.
- **Response**: The merged image with the product on the chosen background.

### `/create_edit` (POST)
- **Description**: Generate an image based on a prompt using AI.
- **Form Data**:
  - `image`: The base image file.
  - `mask`: The mask image file.
  - `prompt`: The prompt for AI image generation.
- **Response**: A JSON object containing the URL of the generated image.


