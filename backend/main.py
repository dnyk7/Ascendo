
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse # For streaming the camera feed
from movementControl import move_backward, move_forward, turn_left, turn_right
from cameraStream import get_video_stream

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from Raspberry!"}

@app.get("/video_feed_1")
async def video_feed_1():
    """
    Endpoint to stream the first camera feed.
    """
    return StreamingResponse(get_video_stream(0), media_type='multipart/x-mixed-replace; boundary=frame')

@app.get("/video_feed_2")
async def video_feed_2():
    """
    Endpoint to stream the second camera feed.
    """
    return StreamingResponse(get_video_stream(1), media_type='multipart/x-mixed-replace; boundary=frame')

@app.get("/video_feed_3")
async def video_feed_3():
    """
    Endpoint to stream the third camera feed.
    """
    return StreamingResponse(get_video_stream(2), media_type='multipart/x-mixed-replace; boundary=frame')

@app.post("/move_forward")
async def move_forward(request: Request):
    move_forward()
    return {"message": "Thrust forward"}

@app.post("/move_backward")
async def move_backward(request: Request):
    move_backward()
    return {"message": "Thrust backward??"}

@app.post("/turn_left")
async def turn_left(request: Request):
    turn_left()
    return {"message": "Turning left"}

@app.post("/turn_right")
async def turn_right(request: Request):
    turn_right()
    return {"message": "Turning right"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    # host="0.0.0.0": Makes the server listen on all interfaces.
    # port=8000, port number (8000) for incoming requests.