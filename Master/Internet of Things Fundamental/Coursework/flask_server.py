from luma.core.render import canvas
from flask import Flask, request
from luma.core.interface.serial import i2c
from luma.oled.device import sh1106
import threading

app = Flask(__name__)

# Initialize the OLED display
serial = i2c(port=1, address=0x3C)
oled = sh1106(serial)


def update_display(status, message):
    # Function to update OLED display with the status and message
    with canvas(oled) as draw:
        # Display status in the top-right corner
        draw.text((oled.width - 50, 0), status, fill="white")

        # Display message starting from the left in the middle
        draw.text((10, 20), message, fill="white")


@app.route('/display', methods=['POST'])
def display_message():
    data = request.json
    status = data.get('status', 'Unknown')
    message = data.get('message', '')

    threading.Thread(target=update_display, args=(status, message)).start()
    return "Message received", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
