import { Box, Image, InfiniteScroll } from 'grommet';
import Ratio from 'react-ratio/lib/Ratio';
import LoadingImageSelector from './LoadingImageSelector';

export default function({
  images,
  loading,
  error,
  activeImageIndex,
  setActiveImageIndex,
  ...props
}) {
  if (loading) return <LoadingImageSelector />;
  if (error) return error.message;
  if (!images) return null;

  return (
    <Box
      as="ul"
      style={{ padding: 0, margin: 0 }}
      overflow="auto"
      direction="row"
      justify="center"
      fill
      {...props}
    >
      <InfiniteScroll items={images} show={0}>
        {(image, i) => {
          const isActive = i === activeImageIndex;
          const setIndex = () => setActiveImageIndex(i);
          const background = { color: isActive ? 'light-4' : 'inherit' };

          return (
            <Box
              key={image.full}
              as="li"
              // style={{ padding: 0, margin: 0 }}
              onClick={setIndex}
              flex={false}
              align="center"
              justify="center"
              width="20%"
              pad="xsmall"
              background={background}
              round="3px"
              overflow="hidden"
            >
              <Box fill="horizontal" overflow="hidden">
                <Ratio>
                  <Box round="3px" overflow="hidden">
                    <Image
                      src={image.full}
                      // height="100%"
                      width="100%"
                      fit="cover"
                    />
                  </Box>
                </Ratio>
              </Box>
            </Box>
          );
        }}
      </InfiniteScroll>
    </Box>
  );
}
