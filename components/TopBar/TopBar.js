import TopBarContext from './context';
import CollapsibleWrapper from './CollapsibleWrapper/CollapsibleWrapper';
import ControlBox from './ControlBox/ControlBox';

export default function TopBar({ prevQuery, small }) {
  return (
    <TopBarContext.Provider value={{ prevQuery, small }}>
      {/* <CollapsibleWrapper> */}
      <ControlBox />
      {/* </CollapsibleWrapper> */}
    </TopBarContext.Provider>
  );
}
