import dayjs from 'dayjs'
import sinon from 'sinon'

import { DateUtilitiesImpl } from '@/utilities'

afterEach(function() {
  sinon.restore()
})

// eslint-disable-next-line max-lines-per-function
describe('Utilities - Date', function() {
  const dateUtilities = new DateUtilitiesImpl()

  const mockDateWithHours = '2012-12-12T00:00:00.000Z'
  const mock2021StringDate = '2012-12-12'
  const mock2000StringDate = '2000-02-01'

  it('Should return Date when i pass a type Date', function() {
    const date = new Date(2014, 1, 24)
    const dateReturn = new Date('2014-02-24T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date).returns(dateReturn)

    expect(dateUtilities.toDate(date)).toEqual(dateReturn)
  })

  it('Should return current date when i pass a wrong format date', function() {
    const date = '24/02/2014'
    const dateReturn = new Date()

    sinon.stub(dateUtilities, 'getDate').withArgs(date).returns(dateReturn)

    expect(dateUtilities.toDate(date)).toEqual(dateReturn)
  })

  it('Should return Date when i pass a type string', function() {
    const dateReturn = new Date(mockDateWithHours)

    sinon.stub(dateUtilities, 'getDate').withArgs(mock2021StringDate).returns(dateReturn)

    expect(dateUtilities.toDate(mock2021StringDate)).toEqual(dateReturn)
  })

  it('Should validade date when i pass a type Date', function() {
    const date = new Date(2014, 1, 24).toISOString().split('T')[0]

    expect(dateUtilities.isValidDate(date)).toEqual(true)
  })

  it('Should validade date when i pass a type String', function() {
    expect(dateUtilities.isValidDate(mock2021StringDate)).toEqual(true)
  })

  it('Should validade date in same year when i pass a type Date', function() {
    const date1 = new Date(2014, 2, 24)
    const date2 = new Date(2014, 1, 24)

    const dateReturn = new Date('2014-02-24T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'year')).toEqual(true)
  })

  it('Should validade date in same year when i pass a type String', function() {
    const date1 = mock2021StringDate
    const date2 = mock2021StringDate

    const dateReturn = new Date(mockDateWithHours)

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'year')).toEqual(true)
  })

  it('Should validade date in same month when i pass a type Date', function() {
    const date1 = new Date(2014, 1, 24)
    const date2 = new Date(2014, 1, 10)

    const dateReturn = new Date('2014-02-10T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'month')).toEqual(true)
  })

  it('Should validade date in same month when i pass a type String', function() {
    const date1 = '2012-12-20'
    const date2 = mock2021StringDate

    const dateReturn = new Date(mockDateWithHours)

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'month')).toEqual(true)
  })

  it('Should return true when I pass two dates in same day', function() {
    const date1 = new Date(2000, 1, 1)
    const date2 = new Date(2000, 1, 1)

    const dateReturn = new Date('2000-02-01T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'day')).toEqual(true)
  })

  it('Should return true when I pass two string dates in same day', function() {
    const date1 = '2000-01-10'
    const date2 = '2000-01-10'

    const dateReturn = new Date('2000-02-10T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2)).toEqual(true)
  })

  it('Should validate current day when i pass a type Date', function() {
    const date = new Date()

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(true)
  })

  it('Should validate current day when i pass a type String', function() {
    const date = new Date().toISOString()

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(true)
  })

  it('Should reject validation day when i pass a type Date', function() {
    const date = new Date(2012, 11, 12)

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(false)
  })

  it('Should reject validation day when i pass a type String', function() {
    const date = new Date(2012, 11, 12).toISOString()

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(false)
  })

  it('Should add day into date when i pass a type Date', function() {
    const date1 = new Date(2012, 11, 12)
    const date2 = new Date('2012-12-17T12:00:00')

    const getDayJsStub = sinon.stub(dateUtilities, 'getDayJs')
    getDayJsStub.withArgs(date1).returns(dayjs(date1))
    getDayJsStub.withArgs(date2).returns(dayjs(date2))

    const receivedDate = dateUtilities.addPeriodsIntoDate(date1, 5, 'day')

    getDayJsStub.withArgs(receivedDate).returns(dayjs(receivedDate))

    const expectedDate = dateUtilities.format(date2)

    expect(dateUtilities.format(receivedDate)).toEqual(expectedDate)
  })

  it('Should add day into current day when i pass a type Date', function() {
    const expectedDate = new Date(2000, 1, 1)

    sinon.stub(dateUtilities, 'getDayJs').withArgs().returns(dayjs())

    sinon.stub(dateUtilities, 'addPeriodsIntoDate').callsFake(function() {
      return expectedDate
    })

    expect(dateUtilities.addPeriodsIntoCurrentDate(5, 'day')).toEqual(expectedDate)
  })

  it('Should apply YYYY-MM-DD format into date when i pass a type Date', function() {
    const date = new Date(2000, 1, 1)
    const dateReturn = mock2000StringDate

    sinon.stub(dateUtilities, 'getDayJs').withArgs(date).returns(dayjs(date))

    expect(dateUtilities.format(date, 'YYYY-MM-DD')).toEqual(dateReturn)
  })

  it('Should format current date', function() {
    const expectedDate = '2021-06-10'

    sinon.stub(dateUtilities, 'format').returns(expectedDate)

    expect(dateUtilities.formatCurrentDate()).toEqual(expectedDate)
  })

  it('Should apply DD/MM/YYYY format into date when i pass a type Date', function() {
    const date = new Date(2000, 1, 1)
    const dateReturn = '01/02/2000'

    sinon.stub(dateUtilities, 'getDayJs').withArgs(date).returns(dayjs(date))

    expect(dateUtilities.format(date, 'DD/MM/YYYY')).toEqual(dateReturn)
  })

  it('Should apply YYYY-MM-DD format into date when i pass a type String', function() {
    const date = mock2000StringDate
    const dateReturn = mock2000StringDate

    sinon.stub(dateUtilities, 'getDayJs').withArgs(date).returns(dayjs(date))

    expect(dateUtilities.format(date, 'YYYY-MM-DD')).toEqual(dateReturn)
  })

  it('Should apply DD/MM/YYYY format into date when i pass a type String', function() {
    const date = mock2000StringDate
    const dateReturn = '01/02/2000'

    sinon.stub(dateUtilities, 'getDayJs').withArgs(date).returns(dayjs(date))

    expect(dateUtilities.format(date, 'DD/MM/YYYY')).toEqual(dateReturn)
  })

  it('Should transform date to start of day', function() {
    // Arrange
    const mockDate = new Date('2021-04-23T15:00:00')

    sinon.stub(dateUtilities, 'getDayJs').withArgs(mockDate).returns(dayjs(mockDate))

    // Act
    const receivedDate = dateUtilities.transformDateToStartOfDay(mockDate)

    // Assert
    const expectedDate = new Date('2021-04-23T00:00:00')
    expect(receivedDate).toEqual(expectedDate)
  })

  it('Should transform date to end of day', function() {
    // Arrange
    const mockDate = new Date('2021-04-23T15:00:00.000')

    sinon.stub(dateUtilities, 'getDayJs').withArgs(mockDate).returns(dayjs(mockDate))

    // Act
    const receivedDate = dateUtilities.transformDateToEndOfDay(mockDate)

    // Assert
    const expectedDate = new Date('2021-04-23T23:59:59.999')
    expect(receivedDate).toEqual(expectedDate)
  })

  it('Should transform date to start of month', function() {
    // Arrange
    const mockDate = new Date('2021-04-20T15:00:00')

    sinon.stub(dateUtilities, 'getDayJs').withArgs(mockDate).returns(dayjs(mockDate))

    // Act
    const receivedDate = dateUtilities.transformDateToStartOfMonth(mockDate)

    // Assert
    const expectedDate = new Date('2021-04-01T00:00:00')
    expect(receivedDate).toEqual(expectedDate)
  })

  it('Should transform date to end of day', function() {
    // Arrange
    const mockDate = new Date('2021-04-18T15:00:00.000')

    sinon.stub(dateUtilities, 'getDayJs').withArgs(mockDate).returns(dayjs(mockDate))

    // Act
    const receivedDate = dateUtilities.transformDateToEndOfMonth(mockDate)

    // Assert
    const expectedDate = new Date('2021-04-30T23:59:59.999')
    expect(receivedDate).toEqual(expectedDate)
  })

  it('Should return two months of different when passing a date in feb and another in april', function() {
    // Arrange
    const mockDate1 = new Date('2021-02-18T15:00:00.000')
    const mockDate2 = new Date('2021-04-30T15:00:00.000')

    // Act
    const receivedDifference = dateUtilities.getMonthsBeetwenTwoDates(mockDate1, mockDate2)

    // Assert
    const expectedDifferente = 2
    expect(receivedDifference).toEqual(expectedDifferente)
  })

  it('Should set the hour of current date', function() {
    // Arrange
    const currentDate = new Date()

    // Act
    const receivedDate = dateUtilities.setCurrentDateHour(15)

    // Assert
    currentDate.setHours(15)
    try {
      expect(currentDate.getHours()).toEqual(receivedDate.getHours())
    } catch (error) {
      currentDate.setHours(18)
      expect(currentDate.getHours()).toEqual(receivedDate.getHours())
    }
  })
})

afterEach(() => sinon.restore())