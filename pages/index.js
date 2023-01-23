import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [company, setCompany] = useState('');
  const [mission, setMission] = useState('');
  const [name, setName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, company, mission, name }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onCompanyChange = (event) => {
    console.log(event.target.value);
    setCompany(event.target.value);
  }
  const onMissionChange = (event) => {
    console.log(event.target.value);
    setMission(event.target.value);
  }
  const onNameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  }
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Customer Email Responder</h1>
          </div>
          <div className="header-subtitle">
            <h2>Include company details and the original customer email below</h2>
          </div>
        </div>
        <div className="prompt-container">
          <input type="text" placeholder='company name' value={company} size='100' onChange={onCompanyChange}></input>
          <input type="text" placeholder='what company does?' size='100' value={mission} onChange={onMissionChange}></input>
          <input type="text" placeholder='your name?' size='100' value={name} onChange={onNameChange}></input>
          <textarea
            className="prompt-box"
            placeholder="start typing here"
            value={userInput}
            onChange={onUserChangedText}
          />;
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>          
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;