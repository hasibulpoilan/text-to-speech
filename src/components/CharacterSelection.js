// src/components/CharacterSelection.js
import React, { useState } from 'react';
import './CharacterSelection.css';

const characters = [
  'Donald Trump',
  'Peter Griffin',
  'Kamala Harris',
  'Ryan Reynolds (Deadpool)',
  'Hugh Jackman (Wolverine)'
];

const CharacterSelection = ({ onSelect }) => {
  const [selected, setSelected] = useState([]);

  const toggleCharacter = (character) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(character)) {
        return prevSelected.filter((c) => c !== character);
      } else {
        return prevSelected.length < 2 ? [...prevSelected, character] : prevSelected;
      }
    });
  };

  React.useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  return (
    <div className="character-selection">
      <h2>Select Characters</h2>
      <ul>
        {characters.map((character) => (
          <li
            key={character}
            className={selected.includes(character) ? 'selected' : ''}
            onClick={() => toggleCharacter(character)}
          >
            {character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSelection;
