import { Stack, TextArea, Button, Form, Grid, Column, ProgressBar, NumberInput } from '@carbon/react';
import { CustomHeader, } from './components/Header';
import { DecodingMethodRadioGroup } from './components/DecodingMethodRadioGroup';
import { OtherPrompts } from './components/OtherPrompts';
import { WordAnalysis } from './components/WordAnalysis';

import './App.css';
import { useState } from 'react';
const API_URL = process.env.API_URL || "http://localhost:5000/";

function App() {
  const [loading, setLoading] = useState(false);
  const [starts, setStarts] = useState({
    lg: 7,
    md: 4,
    sm: 2
  });
  const [decodingMethod, setDecodingMethod] = useState("Sample");
  const [depth, setDepth] = useState(5);
  const [promptData, setPromptData] = useState(null);
  const [bestPrompt, setBestPrompt] = useState('')
  const [rougeScores, setRougeScores] = useState([0, 0]);
  const [percentIncrease, setPercentIncrease] = useState(0);

  const submitPrompt = async event => {
    event.preventDefault();
    console.log(decodingMethod);
    setLoading(true);
    let providedPrompt = document.getElementById("text-area-1").value;
    console.log('provided prompt: ' + providedPrompt);
    console.log('depth value: ' + depth)
    console.log(API_URL);
    try {
      const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          prompt: providedPrompt,
          n: depth,
        })
      });
    
      const promptData = await response.json();
      setPromptData(promptData);
      setRougeScores([promptData.original_rouge_score, promptData.best_rouge_score]);
      setBestPrompt(promptData.best_prompt)
      setPercentIncrease(promptData.percentage_increase);

      setStarts({
        lg: 2,
        md: 1,
        sm: 0
      })
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomHeader />
      <Grid fullWidth style={{ marginTop: '4%' }}>
        <Column
          lg={{ start: starts.lg, end: starts.lg+4 }}
          md={{ start: starts.md, end: starts.md+3 }}
          sm={{ start: starts.sm }}
          style={{ marginTop: '40%' }}
        >
          <Stack gap={5}>
            <Form aria-label="" onSubmit={submitPrompt} className={loading ? 'blur' : ''}>
              <Stack gap={5} className='mb-2'>
                <TextArea
                  labelText={!promptData ? "Provide a prompt:" : "Original Prompt"}
                  helperText={`Rouge Score: ${rougeScores[0]}`}
                  rows={2} id="text-area-1"
                />
                {!promptData &&
                  <> 
                  <NumberInput 
                    id='depth-input'
                    defaultValue={5}
                    label='Prompt Depth'
                    onChange={(e, { value }) => setDepth(value)}
                  />
                  <DecodingMethodRadioGroup setDecodingMethod={setDecodingMethod}/>
                  <Button type="submit">Submit</Button>
                  </>
                }
              </Stack>
              {bestPrompt &&
                <Stack>
                <TextArea
                  labelText="Best prompt:"
                  defaultValue={bestPrompt}
                  helperText={`Rouge Score: ${rougeScores[1]}`}
                  rows={3}
                  id="text-area-2"
                  className='mb-2'
                />
                <h5>{`Rouge Score increased by ${percentIncrease}%`}</h5>
                <h6>{`${rougeScores[0]} -> ${rougeScores[1]}`}</h6>
              </Stack>
            }
            </Form>
            {loading && <ProgressBar label='' helperText="Optimizing Prompt"/>}
          </Stack>
        </Column>
        {promptData &&
            <Column
              lg={{ start: 6, end: 16 }}
              md={{ start: 4, end: 8 }}
              sm={{ start: 0 }}
            >
              <OtherPrompts rows={promptData["optimized_rouge_scores_df"]} />
              <WordAnalysis influentialWords={promptData["top_influential_words"]} />  
            </Column>
        }
      </Grid>
    </div>
  );
}

export default App;
