import * as React from 'react';
import CameraFrame from './CameraFrame';
import TextComponent from './TextComponent';
import Button from '@mui/material/Button';

function InteractiveFrame(props) {
  const [isPaused, setPaused] = React.useState(false);

  const handleClick = () => {
    setPaused(!isPaused);
    console.log(isPaused);
  };
  return (
    <div>
      <div class='flex justify-evenly border w-screen'>
        <CameraFrame />
        <TextComponent />
      </div>

      <div class='absolute inset-x-0 bottom-0 h-16'>
        <Button variant='contained' type='button' onClick={props.handleClick}>
          End
        </Button>
        <Button variant='Text' type='button' onClick={handleClick}>
          Pause
        </Button>
      </div>
    </div>
  );
}

export default InteractiveFrame;
