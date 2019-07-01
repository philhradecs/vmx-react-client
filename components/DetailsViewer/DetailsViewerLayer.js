import { Keyboard, Layer, ThemeContext } from 'grommet';
import DetailsViewer from './DetailsViewer';

export default function DetailsViewerLayer({ searchData, detailsID, close }) {
  const value = { layer: { background: 'transparent' } };

  return (
    <Keyboard onEsc={close} target="document">
      <ThemeContext.Extend value={value}>
        <Layer position="center" onClickOutside={close}>
          <DetailsViewer
            searchData={searchData}
            detailsID={detailsID}
            close={close}
          />
        </Layer>
      </ThemeContext.Extend>
    </Keyboard>
  );
}
