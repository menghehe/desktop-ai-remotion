export const typedText = (
  text: string,
  frame: number,
  startFrame: number,
  framesPerCharacter = 2,
) => {
  const characterCount = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - startFrame) / framesPerCharacter)),
  );

  return text.slice(0, characterCount);
};

export const isTyping = (
  text: string,
  frame: number,
  startFrame: number,
  framesPerCharacter = 2,
) => {
  return frame >= startFrame && frame < startFrame + text.length * framesPerCharacter;
};
