# Title: Approach to Character Generation with Stable Diffusion, DECA, and PIFuHD

## Abstract
In the evolving landscape of computer graphics, this project introduces a transformative method for creating 3D characters from textual descriptions. Dual Stable Diffusion pipelines generate 2D images corresponding to textual attributes for faces and bodies. These images are then converted into 3D models- the DECA model processes the facial image for detailed mesh and texture, hence generating a 3D face, while the PIFuHD model transforms the body image for accurate body mesh generation. This innovative approach ensures realistic and diverse character synthesis, matching specific features such as age, gender, and certain other physical traits. The effectiveness of the method is evident in its visual quality, hence setting a new standard in the realm of character design and generation.

## Deliverables
### PIFu Model:
1. The PIFuHD model is utilized to generate a 3D mesh of the person’s body based on the generated 2D body image.
2. Output Display: Depict a complete three-dimensional image of the entire body.

### DECA Model:
1. The DECA model converts the 2D face image into a 3D face mesh and performs texture mapping to generate texture coordinates for the face mesh.
2. This process produces an .mtl (Material Template Library) file and a .png file containing texture information and a UV map. 

### Stable Diffusion:
1. Preprocessing: Implement a best image selector for improved image generation quality.
2. Fine-tuning for Further Attributes.
3. Test and Evaluate the Model.
4. Model Output Image Selector.
   
### Dream Booth Model:
1. Fine-tune text-to-image diffusion models for subject-driven generation.

## Website:
In addition to the technical achievements outlined above, the project has also resulted in the development of a fully functional interactive website. Users can access the website to generate personalized 3D human figures, specifying details such as facial features, ethnicity, and full-body characteristics. The website also includes a robust backend that stores usergenerated data, allowing them to save their created figures and view past generations of images. Users can download their 3D human figures as well, enabling them to utilize the figures in various digital applications. This integrated website further enhances the utility of the project’s results, providing a userfriendly platform for creating human figures.
The architecture is that of a FReMP based web application, emphasizing 3D model generation and retrieval of past generations. It details a user-interactive ReactJS frontend and a Flask-driven backend for data processing and storage. The development container tracks the process from data handling to model testing, and the model server demonstrates the merging of facial and body models, culminating in detailed 3D representations that are then stored.

## Technologies Used
1. Web Application: ReactJS, MongoDB, Flask, Bootstrap
2. Data Processing: Google Colab, Pandas, face-recognition, Cv2, matplotlib, PIL, OpenCV, Numpy, TensorFlow, Torch, PoseEstimationWithMobileNet, Huggingface diffusers, schedulers, Stablediffusion, DreamBooth, PIFuHD, DECA


