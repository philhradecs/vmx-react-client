import ContextProvider from './lib/ContextProvider';
import InputRangeCompound from './InputRangeCompound';

export default function YearInputRange({
  inputRangeOptions,
  ...formikInputProps
}) {
  return (
    <ContextProvider
      inputRangeOptions={inputRangeOptions}
      value={formikInputProps.value}
    >
      <InputRangeCompound {...formikInputProps} />
    </ContextProvider>
  );
}
