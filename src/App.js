import { Stack, TextArea, Button, Form, Grid, Column, ProgressBar } from '@carbon/react';
import { CustomHeader, } from './components/Header';
import { DecodingMethodRadioGroup } from './components/DecodingMethodRadioGroup';
import './App.css';
import { useState } from 'react';
const API_URL = process.env.API_URL || "http://localhost:3000";

function App() {
  const [decodingMethod, setDecodingMethod] = useState("Greedy");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  const submitPrompt = async event => {
    event.preventDefault();
    setLoadingPrompt(true);
    let providedPrompt = document.getElementById("text-area-1").value;
    const optimizedPrompt = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(
        {
          prompt: providedPrompt,
          decodingMethod,
        })
    });
    setOptimizedPrompt(optimizedPrompt);
    setLoadingPrompt(false);
  };

  return (
    <div>
      <CustomHeader />
      <Grid fullWidth style={{ marginTop: '300px' }}>
        <Column lg={{ start: 7, end: 11 }} md={{ start: 4, end: 7 }} sm={{ start: 2 }}>
          <Form aria-label="" onSubmit={submitPrompt}>
            <Stack gap={5}>
              <TextArea labelText="Provide a prompt:" rows={2} id="text-area-1" />
              <DecodingMethodRadioGroup setDecodingMethod={setDecodingMethod}/>
              <Button type="submit">Submit</Button>
              {loadingPrompt && <ProgressBar label="Optimizing Prompt" />}
            </Stack>
          </Form>
        </Column>
      </Grid>
    </div>
  );
}

export default App;
