import cv2 # For OpenCV image processing
# If using other libraries, reeplace this with the library
# Alternatively, you can use the `requests` library to send HTTP requests to the robot control server
# Alternatives: scikit-imgae, TensorFlow/Pytorch for image processing, etc.
from typing import Generator

def get_video_stream(camera_index: int) -> Generator[bytes, None, None]:
    """
    Function to capture video from the camera and yield frames for streaming.
    """
    cap = cv2.VideoCapture(camera_index)  # 0 usually refers to the default camera

    # Reading Frames in a Loop
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame from camera.")
            break

        # Resize the frame for faster streaming (optional)
        frame = cv2.resize(frame, (640, 480))

        # Encode the frame for efficient transmission (JPEG)
        ret, encoded_frame = cv2.imencode('.jpg', frame)
        frame_bytes = encoded_frame.tobytes()

        # yield makes the function a generator. 
        # Each time a frame is processed into byte format, 
        # the function will yield that frame as part of a multipart HTTP response.
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()