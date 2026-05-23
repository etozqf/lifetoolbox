import {
  differenceInDays,
  differenceInMonths,
  eachDayOfInterval,
  intervalToDuration,
  isBefore,
  isWeekend,
  parseISO,
  isValid,
  addYears,
  setYear,
} from "date-fns";

export function calcAge(birthDateStr: string, today = new Date()) {
  const birth = parseISO(birthDateStr);
  if (!isValid(birth) || isBefore(today, birth)) {
    return { ok: false as const, error: "Invalid or future birth date" };
  }

  const duration = intervalToDuration({ start: birth, end: today });
  const years = duration.years ?? 0;
  const months = duration.months ?? 0;
  const days = duration.days ?? 0;
  const totalDays = differenceInDays(today, birth);

  let nextBirthday = setYear(birth, today.getFullYear());
  if (!isBefore(today, nextBirthday)) {
    nextBirthday = addYears(nextBirthday, 1);
  }
  const daysUntilBirthday = differenceInDays(nextBirthday, today);

  return {
    ok: true as const,
    years,
    months,
    days,
    totalDays,
    totalHours: totalDays * 24,
    daysUntilBirthday,
  };
}

export function calcDaysBetween(startStr: string, endStr: string) {
  const start = parseISO(startStr);
  const end = parseISO(endStr);
  if (!isValid(start) || !isValid(end)) {
    return { ok: false as const, error: "Invalid date" };
  }
  const days = differenceInDays(end, start);
  const weeks = Math.floor(Math.abs(days) / 7);
  const months = Math.abs(differenceInMonths(end, start));
  return { ok: true as const, days, weeks, months };
}

export function calcWorkdaysBetween(startStr: string, endStr: string) {
  const start = parseISO(startStr);
  const end = parseISO(endStr);
  if (!isValid(start) || !isValid(end)) {
    return { ok: false as const, error: "Invalid date" };
  }
  const [from, to] = isBefore(start, end) ? [start, end] : [end, start];
  const days = eachDayOfInterval({ start: from, end: to });
  const workdays = days.filter((d) => !isWeekend(d)).length;
  const totalDays = days.length;
  const weekends = totalDays - workdays;
  return { ok: true as const, workdays, totalDays, weekends };
}

export function calcCountdown(targetStr: string, today = new Date()) {
  const target = parseISO(targetStr);
  if (!isValid(target)) {
    return { ok: false as const, error: "Invalid date" };
  }
  const totalDays = differenceInDays(target, today);
  if (totalDays < 0) {
    return { ok: true as const, passed: true, days: Math.abs(totalDays), totalDays };
  }
  return { ok: true as const, passed: false, days: totalDays, totalDays };
}
