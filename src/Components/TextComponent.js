import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function TextComponent() {
  const [text, setText] = useState('');

  useEffect(() => {
    let interval = setInterval(async () => {
      const res = await fetch(`http://localhost:5000/translate`);
      console.log(res);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box component='span' sx={{ display: 'block' }}>
      {text}
    </Box>
  );
}

export default TextComponent;
