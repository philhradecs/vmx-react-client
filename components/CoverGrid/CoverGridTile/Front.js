import { Box } from 'grommet';
import { useEffect, useState } from 'react';
import LoadingTile from './LoadingTile';

export default function Front({ image }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // TODO: track image loading state and show loading animation

  function handleImageLoaded() {
    setImgLoaded(true);
    setLoading(false);
  }

  function handleImageError() {
    setError(true);
  }

  // useEffect(() => {
  //   setLoading(true);

  //   const img = new Image();

  //   img.src = image.full;
  //   img.onload = handleImageLoaded;
  //   img.onerror = handleImageError;
  // }, [image.full]);

  return (
    <Box
      fill
      background={{
        image: `url("${
          image.full
        }"), url('https://s3.amazonaws.com/detroitpubliclibrary/assets/images/material-cd.jpg')`,
        position: 'center',
        size: 'cover'
      }}
    />
  );
}
