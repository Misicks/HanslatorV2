import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CVCamera from './CVCamera.js';
import { io } from 'socket.io-client';
import Box from '@mui/material/Box';

function InteractiveFrame(props) {
  const [isPaused, setPaused] = useState(false);
  const [texts, setTexts] = useState([]);

  const handlePause = () => {
    setPaused(!isPaused);
  };

  useEffect(() => {
    const socket = io('localhost:5000/', {
      transports: ['polling'],
      cors: {
        origin: 'http://localhost:3000/',
      },
    });

    if (isPaused === false) {
      socket.emit('translate');

      socket.on('data', (data) => {
        let newTexts = [...texts, data.data];
        setTexts(newTexts);
      });

      return function cleanup() {
        socket.disconnect();
      };
    } else {
      socket.emit('paused');
    }
  }, [isPaused, texts]);

  return (
    <div>
      <div class='flex justify-evenly w-screen'>
        <CVCamera isPaused={isPaused} />
        <Box component='span' sx={{ display: 'block' }}>
          <h1>Translated text</h1>
          {texts.join(' ')}
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
