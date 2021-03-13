export type AcceptableDate = Date | string

export interface DateUtilities {
  toDate: (date?: AcceptableDate) => AcceptableDate
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
  format: (date: AcceptableDate, format?: string) => string
}
