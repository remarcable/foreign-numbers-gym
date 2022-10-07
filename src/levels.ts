import random from "just-random-integer";
import { DateTime } from "luxon";

// TODO: times, currency and custom ranges
export const levels = [
  {
    name: "Easy",
    inputType: "number",
    getNumber: () => random(0, 20).toString(),
  },
  {
    name: "Medium",
    inputType: "number",
    getNumber: () => random(0, 100).toString(),
  },
  {
    name: "Hard",
    inputType: "number",
    getNumber: () => random(0, 1000).toString(),
  },
  {
    name: "Dates",
    inputType: "date",
    getNumber: (locale: string) => {
      // TODO: generate better dates (also BC, and for months with 31 days, etc)
      return DateTime.fromObject({
        year: random(1000, 2050),
        month: random(1, 12),
        day: random(1, 30),
      }).toLocaleString(DateTime.DATE_FULL, { locale });
    },
  },
  {
    name: "Time",
    inputType: "time",
    getNumber: (locale: string) => {
      return DateTime.fromObject({
        hour: random(0, 23),
        minute: random(0, 59),
        second: random(0, 59),
      }).toLocaleString(DateTime.TIME_SIMPLE, { locale });
    },
  },
];
