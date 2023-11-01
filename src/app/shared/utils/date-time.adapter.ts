import { DateTime } from 'luxon';

export function converStringToIso(stringDate?: string | null) {
  if (!stringDate) {
    return null;
  }
  const jsDate = new Date(stringDate);
  return DateTime.fromJSDate(jsDate).toISO();
}
