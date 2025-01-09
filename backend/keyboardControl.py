from pynput.keyboard import Listener
import serial

# Initialize serial connection (adjust parameters as needed)
# To find the correct port, run `ls /dev/tty*` in the terminal?
ser = serial.Serial('/dev/ttyUSB0', 9600)


def on_press(key):
    try:
        if key.char == 'w':
            ser.write(b'f')  # Send 'f' for forward
        elif key.char == 's':
            ser.write(b'b')  # Send 'b' for backward
        elif key.char == 'a':
            ser.write(b'l')  # Send 'l' for left
        elif key.char == 'd':
            ser.write(b'r')  # Send 'r' for right
    except AttributeError:
        pass

def start_keyboard_listener():
    with Listener(on_press=on_press) as listener:
        listener.join()

def move_forward():
    if ser:
        ser.write(b'f')  # Command for forward (replace if needed)

def move_backward():
    if ser:
        ser.write(b'b')  # Command for backward (replace if needed)

def move_left():
    if ser:
        ser.write(b'l')  # Command for left (replace if needed)

def move_right():
    if ser:
        ser.write(b'r')  # Command for right (replace if needed)

# ... other movement functions (turn_left, turn_right)
