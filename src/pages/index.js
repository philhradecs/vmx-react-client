import { useEffect, useState } from 'react';
import { Box, Button, Layer } from 'grommet';
import TopBar from '../components/TopBar/TopBar';

function Home() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <TopBar />
      {showOverlay && (
        <Layer
          // full
          onEsc={() => setShowOverlay(false)}
          onClickOutside={() => setShowOverlay(false)}
        >
          <Button label="close" onClick={() => setShowOverlay(false)} />
        </Layer>
      )}
    </>
  );
}

export default Home;
