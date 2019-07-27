import { useState, useEffect } from 'react';
import { Box, Stack } from 'grommet';
import { Expand, Revert, Iteration } from 'grommet-icons';
import useDebounce from 'react-use/lib/useDebounce';
import useToggle from 'react-use/lib/useToggle';

import useHover from 'react-use-hover';
import Ratio from 'react-ratio';
import ReactCardFlip from 'react-card-flip';
import Front from './Front';
import Back from './Back';

import ButtonOverlay from './ButtonOverlay';
import DataOverlay from './DataOverlay';
import ApolloDataProvider from '../../ApolloDataProvider/ApolloDataProvider';
import { GET_RELEASE_DETAILS } from '../../../apollo/queries';
import TileContentContainer from './TileContentContainer';

function TileTransition({ children, isHovering }) {
  const transition = {
    transform: isHovering ? 'scale(0.8)' : '',
    transformOrigin: '5% 5%',
    transition: 'all 200ms ease',
    transitionDelay: isHovering ? '0' : '30'
  };
  return (
    <Box fill style={transition}>
      {children}
    </Box>
  );
}

const AnimatedCombinedOverlay = ({
  children,
  tileIsHovering,
  data,
  buttonMap
}) => {
  return (
    <Stack fill>
      <Box fill>{children}</Box>
      <Box
        fill
        animation={{
          type: tileIsHovering ? 'fadeIn' : 'fadeOut',
          duration: 150,
          delay: tileIsHovering ? 30 : 0
        }}
      >
        <ButtonOverlay buttonMap={buttonMap} />
        <DataOverlay data={data} />
      </Box>
    </Stack>
  );
};

export default function CoverGridTile({ data, openDetailsViewer, ...props }) {
  const [showBack, toggleBack] = useToggle(false);
  const [preloadBack, setPreloadBack] = useState(false);
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 0,
    mouseLeaveDelayMS: 0
  });
  const { image } = data;

  useDebounce(
    () => {
      if (isHovering && !preloadBack) {
        setPreloadBack(true);
      }
    },
    400,
    [isHovering]
  );

  // toggleBack on mouseLeave
  // useEffect(() => {
  //   if (!isHovering && showBack) {
  //     toggleBack();
  //   }
  // }, [isHovering, showBack, toggleBack]);

  function flipTile(event) {
    event.stopPropagation();
    toggleBack();
  }

  const buttonMap = [
    { icon: <Expand />, action: openDetailsViewer },
    { icon: <Revert />, action: flipTile },
    { icon: <Iteration />, action: () => {}, props: { disabled: true } }
  ];

  const apolloOptions = {
    variables: { id: data.id },
    query: GET_RELEASE_DETAILS
  };

  const containerStyle = { width: '100%', height: '100%' };

  return (
    <Box as="li" pad="small" {...hoverProps} onClick={toggleBack} {...props}>
      <Ratio>
        <AnimatedCombinedOverlay
          buttonMap={buttonMap}
          tileIsHovering={isHovering}
          data={data}
        >
          <TileTransition isHovering={isHovering}>
            <ReactCardFlip isFlipped={showBack} containerStyle={containerStyle}>
              <Box fill key="front">
                <TileContentContainer isHovering={isHovering}>
                  <Front image={image} />
                </TileContentContainer>
              </Box>
              <Box fill key="back">
                <TileContentContainer isHovering={isHovering}>
                  <ApolloDataProvider
                    apolloOptions={apolloOptions}
                    typeName="releaseDetails"
                    load={showBack || preloadBack}
                  >
                    <Back />
                  </ApolloDataProvider>
                </TileContentContainer>
              </Box>
            </ReactCardFlip>
          </TileTransition>
        </AnimatedCombinedOverlay>
      </Ratio>
    </Box>
  );
}
