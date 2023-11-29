import { DateTime } from 'luxon';
import { Rental } from '../models/rental.model';

export function converStringToIso(stringDate?: string | null) {
  if (!stringDate) {
    return null;
  }
  const jsDate = new Date(stringDate);
  return DateTime.fromJSDate(jsDate).toISODate();
}

export function compareRentalByStartDate(rentalA: Rental, rentalB: Rental) {
  const dateA = DateTime.fromISO(rentalA.start_date!)
  const dateB = DateTime.fromISO(rentalB.start_date!)
  return dateB.toMillis() - dateA.toMillis()
}

export function getRentalStatus(startDate: string, endDate: string, isCancelled: boolean) {
  if(isCancelled) {
    return 'Anulowane'
  }

  const now = DateTime.now()
  const start = DateTime.fromISO(startDate)
  const end = DateTime.fromISO(endDate)

  if(now < start) {
    return 'Nadchodzące'
  }
  if(now > start && now < end) {
    return 'W trakcie'
  }
  if(now > end) {
    return 'Zakończone'
  }

  return '-'
}