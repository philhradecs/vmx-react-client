import ContextProvider from './lib/ContextProvider';
import InputRangeCompound from './InputRangeCompound';

export default function YearInputRange({ onChange, ...props }) {
  return (
    <ContextProvider {...props}>
      <InputRangeCompound onChange={onChange} />
    </ContextProvider>
  );
}
