import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function TextComponent() {
  const [text, setText] = useState('');

  useEffect(() => {
    let interval = setInterval(async () => {
      const res = await fetch(`http://localhost:5000/translate`);
      res.json().then((data) => {
        console.log(data);
        console.log(data.text);
        setText(data.text);
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box component='span' sx={{ display: 'block' }}>
      <h1>Translated text</h1>
      {text}
    </Box>
  );
}

export default TextComponent;
