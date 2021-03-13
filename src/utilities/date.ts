import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { AcceptableDate, DateUtilities } from '@/data/contracts'

dayjs('2018-05-05').locale('pt-br').format('YYYY-MM-DD')

export class DateUtilitiesImpl implements DateUtilities {
  toDate(date?: AcceptableDate): Date {
    return this.getDate(date)
  }

  getDate(date?: AcceptableDate): Date {
    dayjs.extend(customParseFormat)
    const newData = dayjs(date, 'YYYY-MM-DD', true).isValid()
      ? dayjs(date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD')
    return new Date(newData)
  }

  isValidDate(date: any): boolean {
    return dayjs(date, 'YYYY-MM-DD', true).isValid()
  }

  isDatesInSamePeriod(
    date1: AcceptableDate,
    date2: AcceptableDate,
    period: any = 'day'
  ): boolean {
    return dayjs(date1).isSame(date2, period)
  }

  isDateInCurrentDay(date: AcceptableDate): boolean {
    const today = dayjs()
    const dateToCompare = dayjs(date)
    return (
      today.date() === dateToCompare.date() &&
      today.month() === dateToCompare.month() &&
      today.year() === dateToCompare.year()
    )
  }

  addPeriodsIntoDate(
    date: AcceptableDate,
    numberOfPeriods: number,
    whichPeriod: any
  ): Date {
    const newData = dayjs(date)
      .add(numberOfPeriods, whichPeriod)
      .format('YYYY-MM-DD')
    return new Date(newData)
  }

  addPeriodsIntoCurrentDate(
    numberOfPeriods: number,
    whichPeriod: string
  ): Date {
    const today = dayjs().format('YYYY-MM-DD')
    return this.addPeriodsIntoDate(today, numberOfPeriods, whichPeriod)
  }

  format(date: any, format = 'YYYY-MM-DD'): string {
    return dayjs(date).format(format)
  }
}
