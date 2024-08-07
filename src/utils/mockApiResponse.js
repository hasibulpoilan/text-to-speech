// src/utils/mockApiResponse.js
export const mockApiResponse = (prompt) => {
  return `Character 1: Yo ${prompt.split('Character 2:')[1].trim()}! You're going down!
Character 2: Oh please, ${prompt.split('Character 1:')[1].split('Character 2:')[0].trim()}, you don't stand a chance!`;
};
