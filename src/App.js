import { Stack, TextArea, RadioButton, RadioButtonGroup, Button, Form, Grid, Column } from '@carbon/react';
import { CustomHeader } from './components/Header';
import './App.css';

function App() {
  return (
    <div>
      <CustomHeader />
      <Grid fullWidth style={{ marginTop: '300px' }}>
        <Column lg={{ start: 7, end: 11 }} md={{ start: 4, end: 7 }} sm={{ start: 2 }}>
          <Form aria-label="">
            <Stack gap={5}>
              <TextArea labelText="Provide a prompt:" rows={2} id="text-area-1" />

              <RadioButtonGroup name="radio-button-group" defaultSelected="Greedy">
                <RadioButton value="Greedy" id="radio-1" labelText="Greedy" />
                <RadioButton value="Sample" labelText="Sample" id="radio-2" />
              </RadioButtonGroup>

              <Button>Submit</Button>
            </Stack>
          </Form>
        </Column>
      </Grid>
    </div>
  );
}

export default App;
