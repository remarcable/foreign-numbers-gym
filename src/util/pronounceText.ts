import { getVoices } from "./getVoices";

export const pronounceText = async ({
  text,
  locale,
}: {
  text: string;
  locale: string;
}) => {
  const synth = window.speechSynthesis;
  const voices = await getVoices();

  const voiceForLocale = voices.find((voice: any) => voice.lang === locale);

  const utterance = new SpeechSynthesisUtterance(text);

  if (!voiceForLocale) {
    console.log("No voice found for locale");
    return;
  }

  utterance.voice = voiceForLocale;

  synth.speak(utterance);
};
