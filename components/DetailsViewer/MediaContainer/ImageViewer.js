import { Box } from 'grommet';
import { useState, useEffect, useContext } from 'react';

import ImageSelector from './ImageSelector';
import LoadingImageSelector from './LoadingImageSelector';
import MainImage from './MainImage';
import ApolloDataContext from '../../ApolloDataProvider/context';

export default function ImageViewer(props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { releaseDetails, activeData } = useContext(ApolloDataContext);

  useEffect(
    () => {
      setActiveImageIndex(0);
    },
    [activeData.id]
  );

  return (
    <Box fill gap="1rem" {...props}>
      <MainImage
        imageSrc={
          releaseDetails && releaseDetails.images.length > 0
            ? releaseDetails.images[activeImageIndex].full
            : activeData.image.full
        }
      />
      <Box height="25%">
        {releaseDetails ? (
          <ImageSelector
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            images={releaseDetails.images}
          />
        ) : (
          <LoadingImageSelector />
        )}
      </Box>
    </Box>
  );
}
