import {
  DateUtilities,
  FileUtilities,
  HTMLMounter
} from '@/data'

interface Params {
  dateUtilities: DateUtilities
  fileUtilities: FileUtilities
}

export class HTMLMounterImpl implements HTMLMounter {
  private readonly dateUtilities: DateUtilities
  private readonly fileUtilities: FileUtilities

  constructor(params: Params) {
    this.dateUtilities = params.dateUtilities
    this.fileUtilities = params.fileUtilities

  }

  mount(name: string): string {
    const header = this.fileUtilities.get('assets/html/header.html').toString()
    const footer = this.fileUtilities.get('assets/html/footer.html').toString()

    let html = this.fileUtilities.get(`assets/html/${name}.html`).toString()
    html = html.replace('|header|', header)
    html = html.replace('|footer|', footer)

    html = this.replaceYear(html)

    const template = this.fileUtilities.get('assets/html/template.html').toString()

    return this.replaceYear(template).replace('|body|', html)
  }

  replaceYear(html: string): string {
    return html.replace('|year|', this.dateUtilities.formatCurrentDate('YYYY'))
  }
}