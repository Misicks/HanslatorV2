import * as React from "react";
import Webcam from "react-webcam";

function CameraFrame(props) {
  const [webcamUrl, setWebcamUrl] = React.useState(null);

  const handleUserMedia = (stream) => {
    setWebcamUrl(URL.createObjectURL(stream));
  };

  return (
    <div class="box-content h-96 w-96">
      {props.isPaused ? (
        <div>Video Paused</div>
      ) : (
        <div>
          <Webcam onUserMedia={handleUserMedia} />
          {webcamUrl && <video src={webcamUrl} autoPlay={true} />}
        </div>
      )}
    </div>
  );
}

export default CameraFrame;
