import { TypeUtilitiesImpl } from '@/utilities'

describe('Type Utilities', function() {
  const typeUtilities = new TypeUtilitiesImpl()

  it('Should return the value2 as it is the definied one', function() {
    // Arrange
    const mockValue1 = undefined
    const mockValue2 = 2

    // Act
    const receivedValue = typeUtilities.getTheDefinedValue<number>(mockValue1, mockValue2)

    // Assert
    const expectedValue = mockValue2
    expect(receivedValue).toEqual(expectedValue)
  })

  it('Should return an empty string if the passed one is undefined', function() {
    // Arrange
    const mockString = undefined

    // Act
    const receivedValue = typeUtilities.getStringValueOrEmptyString(mockString)

    // Assert
    const expectedValue = ''
    expect(receivedValue).toEqual(expectedValue)
  })
})
