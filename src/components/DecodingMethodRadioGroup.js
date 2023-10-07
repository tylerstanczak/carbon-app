import { RadioButton, RadioButtonGroup} from '@carbon/react';
export const DecodingMethodRadioGroup = ({ setDecodingMethod }) => {
  return (
    <RadioButtonGroup
      legendText="Decoding Method"
      name="radio-button-group"
      defaultSelected={"Greedy"}
      onChange={selection => setDecodingMethod(selection)}
    >
      <RadioButton value="Greedy" labelText="Greedy" id="radio-1" />
      <RadioButton value="Sample" labelText="Sample" id="radio-2" />
    </RadioButtonGroup>
  );
};