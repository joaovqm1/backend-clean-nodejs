export type AcceptableDate = Date | string

export interface DateUtilities {
  toDate: (date?: AcceptableDate) => Date
  isValidDate: (date: any) => boolean
  isDatesInSamePeriod: (
    date1: AcceptableDate,
    date2: AcceptableDate,
    period: string
  ) => boolean
  isDateInCurrentDay: (date: AcceptableDate) => boolean
  addPeriodsIntoDate: (
    date: AcceptableDate,
    numberOfPeriods: number,
    whichPeriod: string
  ) => Date
  addPeriodsIntoCurrentDate: (
    numberOfPeriods: number,
    whichPeriod: string
  ) => Date
  setCurrentDateHour: (hour: number) => Date
  format: (date: AcceptableDate, format?: string) => string
  formatCurrentDate: (format?: string) => string
  transformDateToStartOfDay: (date: AcceptableDate) => Date
  transformDateToStartOfMonth: (date: AcceptableDate) => Date
  transformDateToEndOfDay: (date: AcceptableDate) => Date
  transformDateToEndOfMonth: (date: AcceptableDate) => Date
  getMonthsBeetwenTwoDates: (date1: AcceptableDate, date2: AcceptableDate) => number
}
