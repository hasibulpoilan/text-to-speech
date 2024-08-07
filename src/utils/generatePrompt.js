// src/utils/generatePrompt.js
export const generatePrompt = (characters) => {
  if (characters.length !== 2) return '';

  const [char1, char2] = characters;

  return `Character 1: ${char1}\nCharacter 2: ${char2}\n\nGenerate a short rap roasting battle between ${char1} and ${char2}. Each character should have a couple of lines, and each line should be concise.`;
};
