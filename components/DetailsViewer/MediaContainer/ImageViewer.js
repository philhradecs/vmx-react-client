import { Box } from 'grommet';
import { useState, useEffect, useContext } from 'react';

import ImageSelector from './ImageSelector';
import LoadingImageSelector from './LoadingImageSelector';
import MainImage from './MainImage';
import ApolloDataContext from '../../ApolloDataProvider/context';

export default function ImageViewer(props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { data: detailsData, activeData } = useContext(ApolloDataContext);

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
