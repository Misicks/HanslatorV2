import * as React from 'react';
import InteractiveFrame from './InteractiveFrame';
import Button from '@mui/material/Button';

function MainFrame() {
  const [isClicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked(!isClicked);
  };

  return (
    <div class='grid h-screen place-items-center'>
      {!isClicked ? (
        <Button variant='contained' type='button' onClick={handleClick}>
          Start
        </Button>
      ) : (
        <InteractiveFrame handleClick={handleClick} />
      )}
    </div>
  );
}

export default MainFrame;
