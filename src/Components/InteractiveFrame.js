import * as React from 'react';
import CameraFrame from './CameraFrame';
import TextComponent from './TextComponent';
import Button from '@mui/material/Button';
import CVCamera from './CVCamera.js';
import { io } from 'socket.io-client';
import Box from '@mui/material/Box';

function InteractiveFrame(props) {
  const [isPaused, setPaused] = React.useState(false);
  const [text, setText] = React.useState('');

  const handlePause = () => {
    setPaused(!isPaused);
  };

  React.useEffect(() => {
    if (isPaused === false) {
      const socket = io('localhost:5000/', {
        transports: ['polling'],
        cors: {
          origin: 'http://localhost:3000/',
        },
      });

      console.log('socket created');

      socket.emit('translate');

      socket.on('data', (data) => {
        console.log(data);
        console.log(data.data);
        setText(data.data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [isPaused]);

  return (
    <div>
      <div class='flex justify-evenly w-screen'>
        <CVCamera />
        <Box component='span' sx={{ display: 'block' }}>
          <h1>Translated text</h1>
          {text}
        </Box>
      </div>

      <div class='absolute inset-x-0 bottom-0 h-16'>
        <Button variant='contained' type='button' onClick={props.handleClick}>
          End
        </Button>
        <Button variant='Text' type='button' onClick={handlePause}>
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </div>
    </div>
  );
}

export default InteractiveFrame;
