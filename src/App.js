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
  const [starts, setStarts] = useState({
    lg: 7,
    md: 4,
    sm: 2
  });
  const [rougeScores, setRougeScores] = useState(["",""]);

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
    setRougeScores(["Rouge Score: 0.25", "Rouge Score: 0.25"]);
    setStarts({
      lg: 3,
      md: 2,
      sm: 1
    })
    setLoadingPrompt(false);
  };

  return (
    <div>
      <CustomHeader />
      <Grid fullWidth style={{ marginTop: '300px' }}>
        <Column
          lg={{ start: starts.lg, end: starts.lg+4 }}
          md={{ start: starts.md, end: starts.md+3 }}
          sm={{ start: starts.sm }}
        >
          <Stack gap={5}>
            <Form aria-label="" onSubmit={submitPrompt} className={loadingPrompt ? 'blur' : ''}>
              <Stack gap={5}>
                <TextArea
                  labelText="Provide a prompt:"
                  helperText={rougeScores[0]}
                  rows={2} id="text-area-1"
                />
                {!optimizedPrompt &&
                  <> 
                  <DecodingMethodRadioGroup setDecodingMethod={setDecodingMethod}/>
                  <Button type="submit">Submit</Button>
                  </>
                }
              </Stack>
            </Form>
            {loadingPrompt && <ProgressBar helperText="Optimizing Prompt"/>}
          </Stack>
        </Column>
        {optimizedPrompt &&
        <Column
          lg={{ start: 9, end: 13 }}
          md={{ start: 5, end: 8 }}
          sm={{ start: 0 }}
        >
          <Stack gap={5}>
            <TextArea
              labelText="Optimized prompt:"
              defaultValue={optimizedPrompt}
              helperText={rougeScores[1]}
              rows={16}
              id="text-area-2"
            />
          </Stack>
        </Column>}
      </Grid>
    </div>
  );
}

export default App;
