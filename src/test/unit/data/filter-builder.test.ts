import { FilterBuilder } from '@/data/filter-builder'

describe('Filter Builder', () => {
	let filterBuilder
	beforeEach(()=>{
		filterBuilder = new FilterBuilder()
	})

	it('Should return filter for equalTo', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'equalTo', field: 'name', value: 'teste' }]
		}
		//Act
		const receivedEqualTo = filterBuilder.equalTo('name', 'teste')

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for selectAndInclude', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'selectAndInclude', fields: ['name'] }]
		}
		//Act
		const receivedEqualTo = filterBuilder.selectAndInclude(['name'])

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for select', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'select', fields: ['name'] }]
		}
		//Act
		const receivedEqualTo = filterBuilder.select(['name'])

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for include', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'include', fields: ['name'] }]
		}
		//Act
		const receivedEqualTo = filterBuilder.include(['name'])

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})


	it('Should return filter for offset', () => {
		//Arrange
		const expectEqualTo = {
			filters: [ { name: 'offset', field: undefined, value: 1 } ]
		}
		//Act
		const receivedEqualTo = filterBuilder.offset(1)

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for limit', () => {
		//Arrange
		const expectEqualTo = {
			filters: [ { name: 'limit', field: undefined, value: 1 } ]
		}
		//Act
		const receivedEqualTo = filterBuilder.limit(1)

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for exists', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'exists', fields: ['name'] }]
		}
		//Act
		const receivedEqualTo = filterBuilder.exists(['name'])

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for greaterThan', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'greaterThan', field: 'date', value: '2021-02-23' }]
		}
		//Act
		const receivedEqualTo = filterBuilder.greaterThan('date', '2021-02-23')

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for greaterThanOrEqualTo', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'greaterThanOrEqualTo', field: 'date', value: '2021-02-23' }]
		}
		//Act
		const receivedEqualTo = filterBuilder.greaterThanOrEqualTo('date', '2021-02-23')

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for lessThan', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'lessThan', field: 'date', value: '2021-02-23' }]
		}
		//Act
		const receivedEqualTo = filterBuilder.lessThan('date', '2021-02-23')

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return filter for lessThanOrEqualTo', () => {
		//Arrange
		const expectEqualTo = {
			filters: [{ name: 'lessThanOrEqualTo', field: 'date', value: '2021-02-23' }]
		}
		//Act
		const receivedEqualTo = filterBuilder.lessThanOrEqualTo('date', '2021-02-23')

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

	it('Should return a builder of the filters', () => {
		//Arrange
		const expectEqualTo = []
		//Act
		const receivedEqualTo = filterBuilder.build()

		//Assert
		expect(receivedEqualTo).toEqual(expectEqualTo)
	})

})
