from flask import Flask, render_template, Response
from flask_cors import CORS

from camera import VideoCamera


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.js')


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


def genText(camera):
    while True:
        text = camera.translate()
        yield (b'--text\r\n'
               b'Content-Type: text\r\n\r\n' + text + b'\r\n\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/translate')
def translate():
    response = {"text": VideoCamera().translate()}
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=False)
