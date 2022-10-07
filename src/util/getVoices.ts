export const getVoices = async (): Promise<Voices> => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  if (voices.length === 0) {
    await wait(100);
    return getVoices();
  }

  return voices;
};

export type Voices = ReturnType<typeof window.speechSynthesis.getVoices>;
export type Voice = Voices[number];

const wait = async (timeout: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), timeout));
