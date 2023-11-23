import { DateTime } from 'luxon';
import { Rental } from '../models/rental.model';

export function converStringToIso(stringDate?: string | null) {
  if (!stringDate) {
    return null;
  }
  const jsDate = new Date(stringDate);
  return DateTime.fromJSDate(jsDate).toISO();
}


export function compareRentalByStartDate(rentalA: Rental, rentalB: Rental) {
  const dateA = DateTime.fromISO(rentalA.start_date!)
  const dateB = DateTime.fromISO(rentalB.start_date!)
  return dateA.toMillis() - dateB.toMillis()
}