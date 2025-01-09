# Ascendo

Use Create React App to quickly set up a new React project:
npx create-react-app my-robot-app

find the serial port and baud rate

to run back
python3 -m venv venv
pip install pip --upgrade
source venv/bin/activate
pip install requirements

uvicorn main:app --reload

run front
npm start

Note that by default, uvicorn starts the app accessible only on 127.0.0.1 and on port 8000.

In your Pi, open a browser and go to http://127.0.0.1:8000/ You should see {"message": "hello from rpi"} displayed on your browser.

Back in the terminal hit CTRL+C to stop the server

Start the server again, this time make it available to the entire network:

uvicorn main.app --host 0.0.0.0

https://forums.raspberrypi.com/viewtopic.php?t=338622 



Access the API from your Computer

Find the Raspberry Pi's IP address:

Open a terminal on your computer.
Use ping raspberrypi.local (if you have configured mDNS) or check your router's DHCP client list to find the IP address.
Access the API:

Open a web browser and go to http://<raspberry_pi_ip_address>:8000/
You should see the "Hello from Raspberry Pi!" message.
Connect to the API from React Frontend

In your React application, use fetch or a library like Axios to make HTTP requests to the API endpoints on the Raspberry Pi.