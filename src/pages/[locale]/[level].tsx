import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useFormik } from "formik";

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
  Text,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { levels } from "levels";
import { pronounceText } from "util/pronounceText";

const getNumber = ({ locale, level }) =>
  levels
    .find((l) => l.name.toLowerCase() === level?.toLowerCase())
    ?.getNumber(locale);

const Home: NextPage = () => {
  const router = useRouter();
  const { locale, level } = router.query;

  const [currentNumber, setCurrentNumber] = useState(null);
  const [guessingResult, setGuessingResult] = useState(null);

  const levelObject = useMemo(
    () => levels.find((l) => l.name.toLowerCase() === level?.toLowerCase()),
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

    setCurrentNumber(newNumber);
    setGuessingResult(null);
    pronounceText({ text: newNumber, locale });
  }, [setCurrentNumber, setGuessingResult, level, locale]);

  const pronounceCurrentNumber = useCallback(() => {
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
