import { useEffect, useState } from 'react';
import { Box, Layer } from 'grommet';
import useDebounce from 'react-use/lib/useDebounce';

import useHover from 'react-use-hover';
import Ratio from 'react-ratio';
import ReactCardFlip from 'react-card-flip';
import Front from './Front';
import Back from './Back';
import BottomContextBar from '../../BottomContextBar/BottomContextBar';
import ButtonOverlay from './ButtonOverlay';

function Tile({ children, isHovering }) {
  return (
    <Box
      fill
      border={
        isHovering
          ? {
              color: 'dark-1',
              size: '1px',
              style: 'solid',
              side: 'all'
            }
          : {}
      }
      round="5px"
      overflow="hidden"
      elevation={isHovering ? 'medium' : 'xsmall'}
    >
      {children}
    </Box>
  );
}

export default function CoverGridTile({ data, openDetailsViewerAtID }) {
  const [showBack, setShowBack] = useState(false);
  const [loadBack, setLoadBack] = useState(false);
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 10,
    mouseLeaveDelayMS: 0
  });
  const { image, id } = data;

  useDebounce(
    () => {
      if (isHovering) {
        setLoadBack(true);
      }
    },
    500,
    [isHovering]
  );

  function openDetailsViewer() {
    openDetailsViewerAtID(data.id);
  }

  return (
    <Box {...hoverProps} margin="0.8rem">
      <Ratio>
        <ReactCardFlip
          isFlipped={showBack}
          flipDirection="horizontal"
          containerStyle={{ height: '100%' }}
        >
          <ButtonOverlay
            key="front"
            tileIsHovering={isHovering}
            handleFlip={() => setShowBack(!showBack)}
            openDetailsViewer={openDetailsViewer}
          >
            <Tile isHovering={isHovering}>
              <Front image={image} />
            </Tile>
          </ButtonOverlay>

          <ButtonOverlay
            key="back"
            tileIsHovering={isHovering}
            handleFlip={() => setShowBack(!showBack)}
            openDetailsViewer={openDetailsViewer}
          >
            <Tile isHovering={isHovering}>
              <Back releaseID={id} loadBack={loadBack} />
            </Tile>
          </ButtonOverlay>
        </ReactCardFlip>
      </Ratio>

      {/* <Layer
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
      </Layer> */}
    </Box>
  );
}
