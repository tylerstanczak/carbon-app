import { Stack, TextArea, Button, Form, Grid, Column, ProgressBar } from '@carbon/react';
import { CustomHeader, } from './components/Header';
import { DecodingMethodRadioGroup } from './components/DecodingMethodRadioGroup';
import { OtherPrompts } from './components/OtherPrompts';
import { WordAnalysis } from './components/WordAnalysis';

import './App.css';
import { useState } from 'react';
const API_URL = process.env.API_URL || "localhost:5000";

function App() {
  const [loading, setLoading] = useState(false);
  const [starts, setStarts] = useState({
    lg: 7,
    md: 4,
    sm: 2
  });
  const [decodingMethod, setDecodingMethod] = useState("Sample");
  const [promptData, setPromptData] = useState(null);
  const [bestPrompt, setBestPrompt] = useState('')
  const [rougeScores, setRougeScores] = useState(["",""]);
  const [percentIncrease, setPercentIncrease] = useState(0);

  const submitPrompt = async event => {
    event.preventDefault();
    setLoading(true);
    let providedPrompt = document.getElementById("text-area-1").value;
    const response = await fetch(API_URL, {
      method: "GET",
      body: JSON.stringify(
        {
          prompt: providedPrompt,
          n: 'two',
        })
    });
    const promptData = await response.json();
    setPromptData(promptData);
    setRougeScores([`Rouge Score: ${promptData.original_rouge_score}`, `Rouge Score: ${promptData.best_rouge_score}`]);
    setBestPrompt(promptData.best_prompt)
    setPercentIncrease(promptData.percentage_increase);
    setStarts({
      lg: 3,
      md: 2,
      sm: 1
    })
    setLoading(false);
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
            <Form aria-label="" onSubmit={submitPrompt} className={loading ? 'blur' : ''}>
              <Stack gap={5}>
                <TextArea
                  labelText={promptData ? "Provide a prompt:" : "Original Prompt"}
                  helperText={rougeScores[0]}
                  rows={2} id="text-area-1"
                />
                {!promptData &&
                  <> 
                  <DecodingMethodRadioGroup setDecodingMethod={setDecodingMethod}/>
                  <Button type="submit">Submit</Button>
                  </>
                }
              </Stack>
            </Form>
            {loading && <ProgressBar helperText="Optimizing Prompt"/>}
          </Stack>
        </Column>
        {promptData &&
        <Column
          lg={{ start: 9, end: 13 }}
          md={{ start: 5, end: 8 }}
          sm={{ start: 0 }}
        >
          <Stack gap={5}>
            <TextArea
              labelText="Optimized prompt:"
              defaultValue={bestPrompt}
              helperText={rougeScores[1]}
              rows={16}
              id="text-area-2"
            />
          </Stack>
        </Column>}
        {promptData &&
          <>
            <h4>{percentIncrease}</h4>
            <OtherPrompts rows={promptData["optimized_rouge_scores_df"]} />
            <WordAnalysis influentialWords={promptData["top_influential_words"]} />
          </>
        }
      </Grid>
    </div>
  );
}

export default App;
