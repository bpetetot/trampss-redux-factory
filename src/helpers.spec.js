/* eslint-env jest */
import { reducer, mapAction, mapState, mapPayload } from './helpers'

const ctx = {
  action: {
    payload: 'payload',
    type: 'TYPE',
  },
  state: {},
}

const customCtx = {
  action: {
    payload: 'payload',
    type: 'CUSTOM',
  },
  state: 'STATE',
}

const mapperAction = () => 'ACTION MAPPED !'
const mapperPayload = () => 'PAYLOAD MAPPED !'
const mapperState = state => `${state} MAPPED !`
const customReducer = (action, state) => (/CUSTOM/.test(action.type) ? 'CUSTOM_STATE' : state)

const execHelper = context => helper => helper()()()(context)

describe('helpers/reducer', () => {
  it('should add reducer but not change state', () => expect(execHelper(ctx)(reducer(customReducer))).toMatchSnapshot())
  it('should add reducer to change state', () => expect(execHelper(customCtx)(reducer(customReducer))).toMatchSnapshot())
})

describe('helpers/mapState', () => {
  it('should map state without matching type', () => expect(execHelper(customCtx)(mapState()(mapperState))).toMatchSnapshot())
  it('should map state (type matcher is KO)', () => expect(execHelper(customCtx)(mapState(/NOTHING/)(mapperState))).toMatchSnapshot())
  it('should map state (type matcher OK)', () => expect(execHelper(customCtx)(mapState(/CUSTOM/)(mapperState))).toMatchSnapshot())
})

describe('helpers/mapPayload', () => {
  it('should map payload without matching type', () => expect(execHelper(ctx)(mapPayload()(mapperPayload))).toMatchSnapshot())
  it('should not map payload (type matcher is KO)', () => expect(execHelper(ctx)(mapPayload(/NOTHING/)(mapperPayload))).toMatchSnapshot())
  it('should map payload (type matcher OK)', () => expect(execHelper(ctx)(mapPayload(/TYPE/)(mapperPayload))).toMatchSnapshot())
})

describe('helpers/mapAction', () => {
  it('should map action', () => expect(execHelper(ctx)(mapAction(mapperAction))).toMatchSnapshot())
})
