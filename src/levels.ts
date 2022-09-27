import random from "just-random-integer";
import { DateTime } from "luxon";

// TODO: currency and custom ranges
export const levels = [
  {
    name: "Easy",
    getNumber: () => random(0, 20),
  },
  {
    name: "Medium",
    getNumber: () => random(0, 100),
  },
  {
    name: "Hard",
    getNumber: () => random(0, 1000),
  },
  {
    name: "Dates",
    getNumber: (lang) => {
      // TODO: generate better dates (also BC, and for months with 31 days, etc)
      return new DateTime.fromObject({
        year: random(1000, 2050),
        month: random(1, 12),
        day: random(1, 30),
      }).toLocaleString(DateTime.DATE_FULL, { locale: lang });
    },
  },
];
