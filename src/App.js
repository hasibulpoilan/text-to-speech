// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterSelection from './components/CharacterSelection';
import { generatePrompt } from './utils/generatePrompt';
import { mockApiResponse } from './utils/mockApiResponse';
import Navbar from './components/Navbar';
import './styles/App.css';

const Home = () => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [conversation, setConversation] = useState('');
  const [isAudioOn, setIsAudioOn] = useState(true);

  const handleGeneratePrompt = async () => {
    const prompt = generatePrompt(selectedCharacters);
    if (!prompt) return;

    try {
      const response = mockApiResponse(prompt);
      setConversation(response);
    } catch (error) {
      console.error('Error fetching LLM response:', error);
    }
  };

  const handleTextToSpeech = async (text) => {
    if (!isAudioOn) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error with TTS:', error);
    }
  };

  const toggleAudio = () => {
    setIsAudioOn((prev) => !prev);
  };

  return (
    <div className="App">
      <Navbar />
      <CharacterSelection onSelect={setSelectedCharacters} />
      <div>
        <h2>Selected Characters:</h2>
        <ul>
          {selectedCharacters.map((character) => (
            <li key={character}>{character}</li>
          ))}
        </ul>
        <button onClick={handleGeneratePrompt} disabled={selectedCharacters.length !== 2}>
          Generate Conversation
        </button>
      </div>
      {conversation && (
        <div className="conversation">
          <h2>Conversation:</h2>
          {conversation.split('\n').map((line, index) => (
            <div key={index}>
              <p>{line}</p>
              <button onClick={() => handleTextToSpeech(line)}>Play Audio</button>
            </div>
          ))}
        </div>
      )}
      <div className="audio-controls">
        <span>{isAudioOn ? 'Audio On' : 'Audio Off'}</span>
        <button onClick={toggleAudio}>{isAudioOn ? 'Turn Off' : 'Turn On'}</button>
      </div>
    </div>
  );
};

const About = () => <div><h2>About Page</h2></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
