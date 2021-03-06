/* eslint-env jest */
import { add } from './actions'
import reducer from './reducer'

const initState = { data: [{ some: 'data' }] }

const prefix = 'testPrefix'

const middleware = name => key => path => defaultData => ctx => ({
  state: { ...ctx.state, key, path, defaultData, [name]: true, prev: ctx },
  action: { ...ctx.action, [name]: true },
})

describe('reducer', () => {
  it('should initialize an action if undefined', () => {
    const testPrefix = reducer({
      engine: [
        middleware('engine'),
      ],
    })('code')(prefix)()
    expect(
      testPrefix(initState, undefined),
    ).toMatchSnapshot()
  })

  it('should call -engine- middleware', () => {
    const testPrefix = reducer({
      engine: [
        middleware('engine'),
      ],
    })('code')(prefix)()
    expect(
      testPrefix(initState, add(prefix)({ code: '1', some: 'info' })),
    ).toMatchSnapshot()
  })

  it('should call -pre- middlewares', () => {
    const testPrefix = reducer({
      pre: [
        middleware('pre1'),
        middleware('pre2'),
      ],
    })('code')(prefix)()

    expect(
      testPrefix(initState, add(prefix)({ code: '1', some: 'info' })),
    ).toMatchSnapshot()
  })

  it('should call -post- middlewares', () => {
    const testPrefix = reducer({
      post: [
        middleware('post1'),
        middleware('post2'),
      ],
    })('code')(prefix)()

    expect(
      testPrefix(initState, add(prefix)({ code: '1', some: 'info' })),
    ).toMatchSnapshot()
  })
})
