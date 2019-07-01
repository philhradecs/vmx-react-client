import CollapsibleWrapper from './CollapsibleWrapper/CollapsibleWrapper';
import ControlBox from './ControlBox/ControlBox';

export default function TopBar({ prevQuery, small }) {
  return (
    <CollapsibleWrapper>
      <ControlBox prevQuery={prevQuery} small={small} />
    </CollapsibleWrapper>
  );
}
