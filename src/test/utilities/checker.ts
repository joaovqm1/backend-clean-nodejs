import { objectUtilities } from '@/main'

interface CheckParams {
  receivedObject: any
  expectedObject: any
  checkOfficeId?: boolean
  checkCreaterId?: boolean
  checkUpdaterId?: boolean
}

export function checkCreatedObjectEqualsExpected(params: CheckParams): void {
  expect(typeof params.receivedObject.id).toBe('number')
  expect(typeof params.receivedObject.createdAt).toBe('string')

  const shouldCheckOfficeId = params.checkOfficeId === undefined || params.checkOfficeId
  const shouldCheckCreaterId = params.checkCreaterId === undefined || params.checkCreaterId

  if (shouldCheckOfficeId) {
    expect(typeof params.receivedObject.officeId).toBe('number')
  }

  if (shouldCheckCreaterId) {
    expect(typeof params.receivedObject.createrId).toBe('number')
  }

  return checkReceivedObjectEqualsExpected(params)
}

export function checkReceivedObjectEqualsExpected(params: CheckParams): void {
  const expectedObject = modifyExpectObjectBeforeMatch(params.expectedObject)

  try {
    expect(params.receivedObject).toEqual(expect.objectContaining(expectedObject))
  } catch (error) {
    expect(params.receivedObject).toEqual(expectedObject)
  }
}

function modifyExpectObjectBeforeMatch(object: any): any {
  for (const field in object) {
    if (field === 'sample') {
      continue
    } else if (object[field] === null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete object[field]
    }

    if (objectUtilities.isObject(object[field])) {
      object[field] = modifyExpectObjectBeforeMatch(object[field])
      if (object[field].sample) {
        continue
      }

      object[field] = expect.objectContaining(object[field])
    }
  }

  return object
}

export function checkReceivedObjectsEqualsExpecteds(receivedObjects: any[], expectedObjects: any[]): void {
  const newExpectedObjects = []
  for (const expectedObject of expectedObjects) {
    newExpectedObjects.push(modifyExpectObjectBeforeMatch(expectedObject))
  }

  try {
    expect(receivedObjects).toEqual(expect.objectContaining(newExpectedObjects))
  } catch (error) {
    expect(receivedObjects).toEqual(newExpectedObjects)
  }
}

export function checkUpdatedObjectEqualsExpected(params: CheckParams): void {
  expect(typeof params.receivedObject.id).toBe('number')
  expect(typeof params.receivedObject.createdAt).toBe('string')
  expect(typeof params.receivedObject.updatedAt).toBe('string')

  const shouldCheckOfficeId = params.checkOfficeId === undefined || params.checkOfficeId
  const shouldCheckCreaterId = params.checkCreaterId === undefined || params.checkCreaterId
  const shouldCheckUpdaterId = params.checkUpdaterId === undefined || params.checkUpdaterId

  if (shouldCheckOfficeId) {
    expect(typeof params.receivedObject.officeId).toBe('number')
  }

  if (shouldCheckCreaterId) {
    expect(typeof params.receivedObject.createrId).toBe('number')
  }

  if (shouldCheckUpdaterId) {
    expect(typeof params.receivedObject.updater).toBe('number')
  }

  return checkReceivedObjectEqualsExpected(params)
}
