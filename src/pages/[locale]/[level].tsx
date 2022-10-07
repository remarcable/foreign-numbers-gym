import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useFormik } from "formik";

import {
  Box,
  Button,
  Flex,
  Input,
  Heading,
  VStack,
  Text,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { levels } from "levels";
import { pronounceText } from "util/pronounceText";

const getNumber = ({ locale, level }: { locale: string; level: string }) =>
  levels
    .find(
      (l: typeof levels[number]) =>
        l.name.toLowerCase() === level?.toLowerCase()
    )
    ?.getNumber(locale);

const Home: NextPage = () => {
  const router = useRouter();
  const locale: string = router.query.locale as string;
  const level: string = router.query.level as string;

  const [currentNumber, setCurrentNumber] = useState<string | null>(null);
  const [guessingResult, setGuessingResult] = useState<boolean | null>(null);

  const levelObject = useMemo(
    () =>
      levels.find(
        (l: any) => l.name.toLowerCase() === (level as string)?.toLowerCase()
      ),
    [level]
  );

  const formik = useFormik({
    initialValues: {
      guess: "",
    },
    onSubmit: ({ guess }) => {
      setGuessingResult(guess === currentNumber);
    },
  });

  const setNewNumber = useCallback(() => {
    const newNumber = getNumber({ locale, level });

    if (!newNumber) {
      throw new Error("No number generated!");
    }

    setCurrentNumber(newNumber);
    setGuessingResult(null);
    pronounceText({ text: newNumber, locale });
  }, [setCurrentNumber, setGuessingResult, level, locale]);

  const pronounceCurrentNumber = useCallback(() => {
    if (!currentNumber) {
      throw new Error("Generate number first");
    }

    pronounceText({ text: currentNumber, locale });
  }, [currentNumber, locale]);

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh" w="100vw">
      <Box bg="white" p={6} rounded="md">
        <VStack>
          <Box>
            <Heading size="lg">{locale}</Heading>
          </Box>
          <Button onClick={pronounceCurrentNumber}>Listen Again</Button>
          <Button onClick={setNewNumber}>New Number</Button>
          <form onSubmit={formik.handleSubmit}>
            <InputGroup size="md">
              <Input
                placeholder="What You've Heard"
                name="guess"
                type={levelObject?.inputType}
                onChange={formik.handleChange}
                value={formik.values.guess}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" type="submit">
                  Check
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text>
              {guessingResult
                ? "Correct"
                : guessingResult !== null
                ? "Incorrect"
                : "Try!"}
            </Text>
          </form>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;
