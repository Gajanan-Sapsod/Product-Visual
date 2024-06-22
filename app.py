from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import os
from rembg import remove
import openai

app = Flask(__name__)
CORS(app)

openai.api_key="sk-proj-6XGL2SVypvBFR71Ofvw2T3BlbkFJg1hytCNy7mekcDGCYcPW"
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
BACKGROUND_FOLDER = 'backgrounds'
os.makedirs(BACKGROUND_FOLDER, exist_ok=True)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def remove_background(input_path, output_path):
  with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input = i.read()
        output = remove(input)
        o.write(output)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Process the image (example: applying a blur filter)
        image = Image.open(filepath)
        
       
        processed_filepath = os.path.join(PROCESSED_FOLDER, filename)
        remove_background(filepath, processed_filepath)

        # Open the processed image
        img = Image.open(processed_filepath)
        width, height = img.size

        # Create a white background image
        bg = Image.new('RGB', (width, height), (255, 255, 255))

        # Paste the processed image onto the white background
        bg.paste(img, (0, 0), img)

        # Save the final image
        final_filepath = os.path.join(PROCESSED_FOLDER, f"final_{filename}")
        bg.save(final_filepath)


        return jsonify({"filename": filename}), 200

@app.route('/processed/<filename>', methods=['GET'])
def get_processed_file(filename):
    return send_file(os.path.join(PROCESSED_FOLDER, f"final_{filename}"))

@app.route('/create_edit', methods=['POST'])
def create_edit():
    if 'image' not in request.files or 'mask' not in request.files or 'prompt' not in request.form:
        return jsonify({"error": "Missing file or prompt"}), 400

    image_file = request.files['image']
    mask_file = request.files['mask']
    prompt = request.form['prompt']

    if image_file.filename == '' or mask_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    mask_path = os.path.join(UPLOAD_FOLDER, mask_file.filename)
    image_file.save(image_path)
    mask_file.save(mask_path)
    
    

   
    #print(prompt)
    response = openai.Image.create_edit(
        image=open(image_path, 'rb'),
        mask=open(mask_path, 'rb'),
        prompt=prompt,
        n=1,
        size="512x512"
    )

    image_url = response["data"][0]["url"]
    print(image_url)
    return jsonify({"image_url": image_url}), 200


@app.route('/generate_image', methods=['POST'])
def generate_image():
    if 'prompt' not in request.form:
        return jsonify({"error": "Missing prompt"}), 400

    prompt = request.form['prompt']

    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="512x512"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    if 'data' not in response or len(response['data']) == 0:
        return jsonify({"error": "Invalid response from OpenAI API"}), 500

    image_url = response["data"][0]["url"]
    return jsonify({"image_url": image_url}), 200




@app.route('/merge-images', methods=['POST'])
def merge_images():
    if 'productImage' not in request.files or 'backgroundImage' not in request.files:
        return jsonify({"error": "Missing files"}), 400

    product_image_file = request.files['productImage']
    background_image_file = request.files['backgroundImage']
    
    product_image_path = os.path.join(UPLOAD_FOLDER, product_image_file.filename)
    background_image_path = os.path.join(UPLOAD_FOLDER, background_image_file.filename)

    product_image_file.save(product_image_path)
    background_image_file.save(background_image_path)

    # Process product image (remove background)
    processed_product_path = os.path.join(PROCESSED_FOLDER, f"processed_{product_image_file.filename}")
    remove_background(product_image_path, processed_product_path)

    # Open background image
    background_image = Image.open(background_image_path).convert("RGBA")

    # Open processed product image
    processed_product_image = Image.open(processed_product_path).convert("RGBA")

    # Create a new RGBA image for merging
    final_image = Image.new('RGBA', background_image.size, (255, 255, 255, 255))
    final_image.paste(background_image, (0, 0))
    final_image.paste(processed_product_image, (0, 0), processed_product_image)

    # Save final image with transparent background
    final_image_path = os.path.join(PROCESSED_FOLDER, f"final_{product_image_file.filename}")
    final_image.save(final_image_path, 'PNG')

    return send_file(final_image_path, mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True)


