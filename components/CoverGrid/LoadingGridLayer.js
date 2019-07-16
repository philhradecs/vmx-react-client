import { Layer, ThemeContext, Keyboard } from 'grommet';
import LoadingGrid from './LoadingGrid';

export default function LoadingGridLayer({ text, interruptQuery = () => {} }) {
  const value = { layer: { background: 'transparent' } };

  if (typeof document === 'undefined') return null;

  return (
    <Keyboard onEsc={interruptQuery} target="document">
      <ThemeContext.Extend value={value}>
        <Layer position="center" onClickOutside={interruptQuery}>
          <LoadingGrid text={text} />
        </Layer>
      </ThemeContext.Extend>
    </Keyboard>
  );
}
