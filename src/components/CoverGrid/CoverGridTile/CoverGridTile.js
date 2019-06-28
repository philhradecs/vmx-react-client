import { useState, useEffect } from 'react';
import { Box, Layer, Anchor } from 'grommet';
import useDebounce from 'react-use/lib/useDebounce';
import useToggle from 'react-use/lib/useToggle';

import useHover from 'react-use-hover';
import Ratio from 'react-ratio';
import ReactCardFlip from 'react-card-flip';
import Front from './Front';
import Back from './Back';
// import BottomContextBar from '../../BottomContextBar/BottomContextBar';
import ButtonOverlay from './ButtonOverlay';

function Tile({ children, isHovering }) {
  // const transition = {
  //   transform: isHovering
  //     ? ' rotate(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  //     : '',
  //   tranformOrigin: 'transform-origin: 50% 50%',
  //   transition: 'transform 200ms'
  // };

  return (
    <Box
      fill
      border={{
        color: isHovering ? 'dark-1' : 'dark-6'
        // size: '1px'
      }}
      overflow="hidden"
      round="4px"
      elevation={isHovering ? 'medium' : 'xsmall'}
      // style={transition}
    >
      {children}
    </Box>
  );
}

export default function CoverGridTile({ data, openDetailsViewer, ...props }) {
  const [showBack, toggleBack] = useToggle(false);
  const [preloadBack, setPreloadBack] = useState(false);
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 10,
    mouseLeaveDelayMS: 0
  });
  const { image, id } = data;

  useDebounce(
    () => {
      if (isHovering && !preloadBack) {
        setPreloadBack(true);
      }
    },
    400,
    [isHovering]
  );

  function handleToggleBack(event) {
    event.stopPropagation();
    toggleBack();
  }

  return (
    <Box onClick={openDetailsViewer} {...hoverProps} {...props}>
      <Ratio>
        <ReactCardFlip
          isFlipped={showBack}
          containerStyle={{ width: '100%', height: '100%' }}
        >
          {/* <FrontSide style={{ padding: '0', boxShadow: 'none' }}> */}
          <ButtonOverlay
            key="front"
            tileIsHovering={isHovering}
            handleFlip={handleToggleBack}
            openDetailsViewer={openDetailsViewer}
          >
            <Tile isHovering={isHovering}>
              <Front image={image} />
            </Tile>
          </ButtonOverlay>
          <ButtonOverlay
            key="back"
            tileIsHovering={isHovering}
            handleFlip={handleToggleBack}
            openDetailsViewer={openDetailsViewer}
          >
            <Tile isHovering={isHovering}>
              <Back releaseID={id} loadBack={showBack || preloadBack} />
            </Tile>
          </ButtonOverlay>
        </ReactCardFlip>
      </Ratio>
    </Box>
  );
}

/* <Layer
        animate={false}
        full="horizontal"
        modal={false}
        style={{
          minHeight: '0px',
          pointerEvents: 'none'
        }}
        plain
        position="bottom"
        height={gridHeight}
        justify="end"
      >
        <Box
          // height={gridHeight}
          // background="rgba(0,0,0, 0.1)"
          animation={
            isHovering
              ? { type: 'fadeIn', duration: 180 }
              : { type: 'fadeOut', duration: 180 }
          }
          justify="end"
        >
          <BottomContextBar contextData={data} />
        </Box>
      </Layer> */
