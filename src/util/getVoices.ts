export const getVoices = async () => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  if (voices.length === 0) {
    await wait(100);
    return getVoices();
  }

  return voices;
};

const wait = async (timeout: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), timeout));
