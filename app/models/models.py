from inference_sdk import InferenceHTTPClient
import os
from PIL import Image
import cv2
import numpy as np
from io import BytesIO
from typing import List, Dict

# Initialize the Roboflow client globally (outside any function)
client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key="W5MsQQZpv9FnaiGX3hG7"  # Replace with your actual API key
)

def detect_food_labels_from_image(image_path: str, confidence_threshold: float = 0.65) -> List[Dict]:
    detections = []
    
    # Run detection on the uploaded image using Roboflow
    result = client.run_workflow(
        workspace_name="machinelearning-4tyun",
        workflow_id="detect-and-classify-4",
        images={"image": image_path},
        use_cache=True
    )

    # Process each prediction from the result
    for item in result:
        predictions = item.get('detection_predictions', {}).get('predictions', [])
        
        for prediction in predictions:
            label = prediction['class']  # This will be the label predicted by the model
            confidence = prediction['confidence']  # Confidence of the prediction
            
            # If the confidence is above the threshold, we add the detection
            if confidence >= confidence_threshold:
                detections.append({
                    "label": label,
                    "confidence": confidence,
                    "bounding_box": {
                        "x": prediction['x'],
                        "y": prediction['y'],
                        "width": prediction['width'],
                        "height": prediction['height']
                    }
                })

    return detections


def draw_bounding_boxes(image_path: str, detections: List[Dict]) -> np.ndarray:
    # Load the image using OpenCV
    image = cv2.imread(image_path)

    # Annotate the image with bounding boxes and labels
    for detection in detections:
        if 'bounding_box' in detection:
            # Extract and convert the bounding box coordinates to integers
            x, y, w, h = map(int, [detection['bounding_box']['x'], 
                                    detection['bounding_box']['y'], 
                                    detection['bounding_box']['width'], 
                                    detection['bounding_box']['height']])

            # Draw green bounding box
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)  # Green color for bounding box

            # Draw the label and confidence percentage above the bounding box
            cv2.putText(image, f"{detection['label']} {detection['confidence'] * 100:.2f}%", 
                        (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)  # Green color for text

    return image




# Handle video streaming from webcam and run detection
def detect_food_labels_from_video(video_source=0, confidence_threshold: float = 0.65):
    # Start capturing video from the webcam
    cap = cv2.VideoCapture(video_source)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Save the current frame temporarily as an image
        ret, jpeg = cv2.imencode('.jpg', frame)
        image_bytes = jpeg.tobytes()
        pil_image = Image.open(BytesIO(image_bytes))
        image_path = 'temp_frame.jpg'
        pil_image.save(image_path)

        # Run food detection on the current frame
        detections = detect_food_labels_from_image(image_path, confidence_threshold)
        
        # Annotate the frame with detected bounding boxes and labels
        for detection in detections:
            label = detection['label']
            confidence = detection['confidence']
            
            # Draw the bounding box around the detected object
            cv2.rectangle(frame, (int(detection['x']), int(detection['y'])),
                          (int(detection['x'] + detection['width']), int(detection['y'] + detection['height'])),
                          (0, 255, 0), 2)  # Green color for the bounding box

            # Display the label and confidence near the bounding box
            label_text = f"{label} ({confidence * 100:.1f}%)"
            cv2.putText(frame, label_text, 
                        (int(detection['x']), int(detection['y'] - 10)),  # Position the text just above the bounding box
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)  # White color with thickness of 2

        # Display the frame with annotations
        cv2.imshow("Food Detection", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to quit
            break

    cap.release()
    cv2.destroyAllWindows()
