from flask import Flask, request, jsonify, render_template, Response
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import cv2
from camera import VideoCamera


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route('/')
def index():
    return render_template('index.js')


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/translate')
def translate():
    response = {"text": VideoCamera().translate(), "HELLO": "WORLD"}
    return jsonify(response)


@socketio.on("translate")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("language translation on")
    VideoCamera().translate() 
    # while True:
    #     print("HELLO WORLD")
    #     emit("data", {'data': VideoCamera().translate(),
    #          'id': request.sid}, broadcast=True)


# @socketio.on("disconnect")
# def disconnected():
#     """event listener when client connects to the server"""
#     print(request.sid)
#     print("turn off camera")
#     VideoCamera().video.closed()


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
