export enum FinanceStatus {
  OPENED = 'ABERTA',
  FINISHED = 'FINALIZADA'
}

export interface ProjectPaymentRequestDTO {
  value: number
  entry: number
  interval: number
  finances?: ProjectPaymentFinance[]
}

export interface ProjectPaymentFinance {
  value: number
  date: string
  status: FinanceStatus
}
