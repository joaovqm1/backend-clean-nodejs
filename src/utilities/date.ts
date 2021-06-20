import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { AcceptableDate, DateUtilities } from '@/data/contracts'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

const defaultTimezone = 'America/Sao_Paulo'
const defaultDateFormat = 'YYYY-MM-DD'
export class DateUtilitiesImpl implements DateUtilities {
  toDate(date?: AcceptableDate): Date {
    return this.getDate(date)
  }

  /* istanbul ignore next */
  getDate(date?: AcceptableDate): Date {
    const changedDayJs = this.getDayJs(date)
    return changedDayJs.toDate()
  }

  /* istanbul ignore next */
  getDayJs(date?: AcceptableDate): Dayjs {
    /**
     * Atenção: se encontrar um bug ou qualquer outro motivo para mudar essa função, se comunique com todos antes pois essa
     * é uma parte muito crítica do sistema.
     */
    if (date !== undefined) {
      return dayjs(date).utc()
    } else {
      return dayjs().utc(true).local().tz(defaultTimezone)
    }
  }

  isValidDate(date: any): boolean {
    return dayjs(date).isValid() || dayjs(date, defaultDateFormat, true).isValid()
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
    const changedDayJs = this.getDayJs(date)
    return changedDayJs
      .add(numberOfPeriods, whichPeriod)
      .toDate()
  }

  addPeriodsIntoCurrentDate(
    numberOfPeriods: number,
    whichPeriod: string
  ): Date {
    const today = this.getDayJs().toDate()
    return this.addPeriodsIntoDate(today, numberOfPeriods, whichPeriod)
  }

  format(date: AcceptableDate, format = defaultDateFormat): string {
    return this.getDayJs(date).format(format)
  }

  formatCurrentDate(format = defaultDateFormat): string {
    return this.format(new Date(), format)
  }

  transformDateToStartOfDay(date: AcceptableDate): Date {
    return this.getDayJs(date).startOf('day').toDate()
  }

  transformDateToStartOfMonth(date: AcceptableDate): Date {
    return this.getDayJs(date).startOf('month').toDate()
  }

  transformDateToEndOfDay(date: AcceptableDate): Date {
    return this.getDayJs(date).endOf('day').toDate()
  }

  transformDateToEndOfMonth(date: AcceptableDate): Date {
    return this.getDayJs(date).endOf('month').toDate()
  }

  getMonthsBeetwenTwoDates(date1: AcceptableDate, date2: AcceptableDate): number {
    return this.getDayJs(date2).diff(date1, 'months')

  }

  setCurrentDateHour(hour: number): Date {
    return this.getDayJs().hour(hour).toDate()
  }
}