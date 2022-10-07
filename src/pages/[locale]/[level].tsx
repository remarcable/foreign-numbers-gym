import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Select,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { levels } from "../../levels";
import { getVoices } from "../../util/getVoices";

const pronounce = async ({ text, locale }) => {
  const synth = window.speechSynthesis;
  const voices = await getVoices();

  const voiceForLocale = voices.find((voice) => voice.lang === locale);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voiceForLocale;

  synth.speak(utterance);
};
const Home: NextPage = () => {
  const router = useRouter();
  const { locale, level } = router.query;

  const pronounceNewNumber = useCallback(
    () =>
      pronounce({
        text: levels
          .find((l) => l.name.toLowerCase() === level.toLowerCase())
          ?.getNumber(locale),
        locale,
      }),
    [locale, level]
  );

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh" w="100vw">
      <Box bg="white" p={6} rounded="md">
        <VStack>
          <Box>
            {locale} - {level}
          </Box>
          <Button onClick={pronounceNewNumber}>Hello World</Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;
