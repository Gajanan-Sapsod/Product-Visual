import React from "react";
import "./App.css";
import ImageUpload from "./ImageUpload";
import EditImage from "./EditImage";
import Navbar from "./Components/Navbar";
import GenerateImage from "./GenerateImage";
import ImageEditor from "./ImageEditor";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="container">
        <div class="card my-3" >
          <div class="card-body">
            <h5 class="card-title">Effortless Background Removal</h5>
            <p class="card-text">
              This functionality automates the process of removing backgrounds from images,
              providing sellers with clean, isolated product visuals. It accelerates workflow
              efficiency in e-commerce and design,
              ensuring seamless integration of products into various contexts.
              </p>
            <ImageUpload />
          </div>
        </div>
        
        <div class="card my-3" >
          <div class="card-body">
            <h5 class="card-title">Visual Precision AI Editing</h5>
            <p class="card-text">
              his innovative feature allows sellers to select specific parts of an image,
              apply customized prompts, and seamlessly integrate desired changes.
              By leveraging advanced AI technology, it empowers sellers,
              particularly in fields like design, marketing, and e-commerce,
              to enhance image aesthetics with precision and creativity.
              This capability not only streamlines editing workflows but
              also ensures that images are tailored to exact specifications,
              thereby optimizing visual impact and engagement.
            </p>
            <EditImage />
          </div>
        </div>
        
        <div class="card my-3" >
          <div class="card-body">
            <h5 class="card-title">Dynamic Image Generation </h5>
            <p class="card-text">
              This feature enables sellers to generate images based on intuitive prompts,
              leveraging AI to create tailored visuals swiftly.
              It enhances creativity and efficiency in design and marketing,
              allowing sellers to meet diverse visual requirements with ease.
            </p>
            <GenerateImage/>
          </div>
        </div>

        <div class="card my-3" >
          <div class="card-body">
            <h5 class="card-title">Adaptive Background Addition</h5>
            <p class="card-text">
              This feature allows sellers to add customized backgrounds to
              images effortlessly, enhancing visual storytelling and product presentation.
              It empowers sellers in marketing and content creation to adapt images to specific
              themes or settings,
              maximizing aesthetic appeal and engagement.
            </p>
            <ImageEditor/>
          </div>
        </div>

     
      </header>
    </div>
  );
}

export default App;
