import { Box, DropButton } from 'grommet';

function GenreSearchDropdown() {
  return (
    <DropButton
      label="Genre"
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={<Box pad="large" background="light-2" />}
    />
  );
}

export default GenreSearchDropdown;
