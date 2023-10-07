import { Stack, TextArea, RadioButton, RadioButtonGroup, Button, Form, Grid, Column, ProgressBar } from '@carbon/react';
import { CustomHeader } from './components/Header';
import './App.css';
import { useState } from 'react';
const API_URL = process.env.API_URL;

function App() {
  const [providedPrompt, setProvidedPrompt] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  const submitPrompt = async prompt => {
    setLoadingPrompt(true);
    const optimizedPrompt = await fetch(API_URL, {
      method: "POST",
      body: prompt
    });
    setOptimizedPrompt(optimizedPrompt);
    setLoadingPrompt(false);
  };

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

              <Button onSubmit={submitPrompt(providedPrompt)}>Submit</Button>
              loading && <ProgressBar label="Optimizing Prompt" />
            </Stack>
          </Form>
        </Column>
      </Grid>
    </div>
  );
}

export default App;
