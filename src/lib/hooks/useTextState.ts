import { useState } from "react";

// Custom hook for managing text state
export const useTextState = (initialValue = "") => {
  const [text, setText] = useState(initialValue);

  const updateText = (newText:string) => {
    setText(newText);
  };

  return {
    text,
    setText: updateText,  // Renamed to setText to maintain conventional API
  };
};
