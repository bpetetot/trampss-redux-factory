export const reducer = mapper =>
  // middleware signature
  () => () => () => ctx => ({ ...ctx, state: mapper(ctx.action, ctx.state) })


export const mapAction = mapper =>
  // middleware signature
  () => () => () => ctx => ({
    ...ctx,
    action: mapper(ctx.action),
  })

export const mapState = actionMatches => mapper =>
  // middleware signature
  () => () => () => (ctx) => {
    const action = ctx.action
    if (!actionMatches || actionMatches.test(action.type)) {
      return { action, state: mapper(ctx.state) }
    }
    return ctx
  }

export const mapPayload = actionMatches => mapper =>
  // middleware signature
  () => () => () => (ctx) => {
    const { payload, type } = ctx.action
    if (!actionMatches || actionMatches.test(type)) {
      return mapAction(action => ({ ...action, payload: mapper(payload) }))()()()(ctx)
    }
    return ctx
  }
