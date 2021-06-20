import sinon from 'sinon'

import { dateUtilities, fileUtilities } from '@/main'
import { HTMLMounterImpl } from '@/utilities'

describe('HTML Mounter', function() {
  const htmlMounter = new HTMLMounterImpl({ dateUtilities, fileUtilities })

  it('Should add header, footer, change year and return html', async function() {
    // Arrange
    const mockHtmlName = 'name'

    const getFileStub = sinon.stub(fileUtilities, 'get')
    getFileStub.withArgs('assets/html/header.html').returns('header')
    getFileStub.withArgs('assets/html/footer.html').returns('footer')
    getFileStub.withArgs('assets/html/template.html').returns('|body|')
    getFileStub.withArgs(`assets/html/${mockHtmlName}.html`).returns('|header| |footer| content |year|')
    sinon.stub(dateUtilities, 'formatCurrentDate').withArgs('YYYY').returns('2021')

    // Act
    const receivedHtml = htmlMounter.mount(mockHtmlName)

    // Assert
    const expectedHtml = 'header footer content 2021'
    expect(receivedHtml).toEqual(expectedHtml)
  })

})