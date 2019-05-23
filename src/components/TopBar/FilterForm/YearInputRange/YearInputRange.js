import ContextProvider from './lib/ContextProvider';
import InputRangeCompound from './InputRangeCompound';

export default function YearInputRange({
  placeholder,
  name,
  onChange,
  ...props
}) {
  return (
    <ContextProvider {...props}>
      <InputRangeCompound
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </ContextProvider>
  );
}
