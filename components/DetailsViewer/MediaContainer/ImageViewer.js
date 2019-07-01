import { Box } from 'grommet';
import { useState, useEffect } from 'react';

import ImageSelector from './ImageSelector';
import LoadingImageSelector from './LoadingImageSelector';
import MainImage from './MainImage';

export default function ImageViewer({ activeData, detailsData }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(
    () => {
      setActiveImageIndex(0);
    },
    [activeData.id]
  );

  return (
    <Box fill gap="1rem">
      <MainImage
        imageSrc={
          detailsData && detailsData.images.length > 0
            ? detailsData.images[activeImageIndex].full
            : activeData.image.full
        }
      />
      <Box height="25%">
        {detailsData ? (
          <ImageSelector
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            images={detailsData.images}
          />
        ) : (
          <LoadingImageSelector />
        )}
      </Box>
    </Box>
  );
}
