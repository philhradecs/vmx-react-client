import { Box, Image } from 'grommet';
import Ratio from 'react-ratio/lib/Ratio';
import LoadingImageSelector from './LoadingImageSelector';

export default function({
  images,
  loading,
  error,
  activeIndex,
  setActiveIndex
}) {
  if (loading) return <LoadingImageSelector />;
  if (error) return error.message;
  if (!images) return null;

  return (
    <Box direction="row">
      {images.map((image, i) => {
        const isActive = i === activeIndex;
        return (
          <Box
            onClick={() => setActiveIndex(i)}
            key={image.full}
            border={{ size: '1px', color: isActive ? 'orange' : 'black' }}
            overflow="hidden"
            fill
          >
            <Ratio>
              <Image src={image.full} height="100%" fit="cover" />
            </Ratio>
          </Box>
        );
      })}
    </Box>
  );
}
