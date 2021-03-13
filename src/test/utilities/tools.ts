import _sinon from 'sinon'
import chai from 'chai'
import chaiDateTime from 'chai-datetime'
import chaiShalloDeepEqual from 'chai-shallow-deep-equal'
import chaiAsPromised from 'chai-as-promised'

export const sinon = _sinon
export const assert = sinon.assert

chai.use(chaiDateTime)
chai.use(chaiShalloDeepEqual)
chai.use(chaiAsPromised)

export const expect = chai.expect
