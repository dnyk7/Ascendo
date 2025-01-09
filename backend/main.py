
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse # For streaming the camera feed
from movementControl import move_backward, move_forward, turn_left, turn_right
from cameraStream import get_video_stream

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from Raspberry!"}

@app.get("/about/")
def about():
    return HTMLResponse(
    """
    <html>
      <head>
        <title>My Test API</title>
      </head>
      <body>
        <div align="center">
          <h1>My Test API</h1>
        </div>
      </body>
    </html>
    """
    )

@app.get("/video_feed")
def video_feed():
    """
    FastAPI endpoint to stream video frames.
    """
    return StreamingResponse(get_video_stream(), media_type="multipart/x-mixed-replace; boundary=frame")

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