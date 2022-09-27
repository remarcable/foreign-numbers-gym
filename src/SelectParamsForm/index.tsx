import { useEffect, useMemo, useState } from "react";
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
} from "@chakra-ui/react";
import { levels } from "../levels";
import { useRouter } from "next/router";

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
const getSpeechSynthesisLocales = () =>
  window.speechSynthesis
    .getVoices()
    .map((voice) => ({
      locale: voice.lang,
      displayName: languageNames.of(voice.lang) ?? "-",
    }))
    .filter(
      // Each language once
      (langObject, i, arr) =>
        arr.findIndex((lang) => lang.locale === langObject.locale) === i
    )
    .sort((a, b) => a.displayName?.localeCompare(b.displayName));

const SelectParamsForm = () => {
  const [locales, setLocalesToState] = useState<
    { locale: string; displayName: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const setLocales = () => {
      const locales = getSpeechSynthesisLocales();

      if (locales.length > 0) {
        setLocalesToState(locales);
      } else {
        setTimeout(() => setLocales(), 200);
      }
    };

    setLocales();
  }, [setLocalesToState]);

  const formik = useFormik({
    initialValues: {
      language: "en-US",
      level: "easy",
    },
    onSubmit: (values) => {
      router.push(`/${values.language}/${values.level}`);
    },
  });
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh" w="100vw">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start" minW="xl">
            <Heading size="lg">Learn Numbers</Heading>
            <FormControl>
              <FormLabel htmlFor="language">Language</FormLabel>
              <Select
                id="language"
                name="language"
                onChange={formik.handleChange}
                value={formik.values.language}
              >
                {locales.map((locale) => (
                  <option key={locale.displayName} value={locale.locale}>
                    {locale.displayName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="level">Level</FormLabel>
              <Select
                id="level"
                name="level"
                onChange={formik.handleChange}
                value={formik.values.level}
              >
                {levels.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="purple" width="full">
              Learn
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default SelectParamsForm;
