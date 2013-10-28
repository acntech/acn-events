basedir = "../../../"
configDir = basedir + "config/"
actions = require(configDir + "actions.js")

describe "When calling register action", ->
  registerAct = actions.register

  it 'valid next actions are only: unregister and confirm', () ->
    expect(registerAct.nextActions.length).toBe(2)
    expect(registerAct.nextActions[0].name).toBe(actions.unregister.name)
    expect(registerAct.nextActions[1].name).toBe(actions.confirm.name)
    expect(registerAct.isValidNextAction(actions.confirm.name)).toBe(true)
    expect(registerAct.isValidNextAction(actions.unregister.name)).toBe(true)
    expect(registerAct.isValidNextAction(actions.checkIn.name)).toBe(false)
    expect(registerAct.isValidNextAction(actions.register.name)).toBe(false)

  it "three links should be valid for self, unregister and confirm", () ->
    expect(registerAct.links().self).not.toBe(undefined)
    expect(registerAct.links().unregister).not.toBe(undefined)
    expect(registerAct.links().confirm).not.toBe(undefined)
    expect(registerAct.links().checkIn).toBe(undefined)

describe "When calling confirm action", ->
  confirmAct = actions.confirm

  it 'valid next actions are only: unregister and checkin', () ->
    expect(confirmAct.nextActions.length).toBe(2)
    expect(confirmAct.nextActions[0].name).toBe(actions.unregister.name)
    expect(confirmAct.nextActions[1].name).toBe(actions.checkIn.name)
    expect(confirmAct.isValidNextAction(actions.checkIn.name)).toBe(true)
    expect(confirmAct.isValidNextAction(actions.unregister.name)).toBe(true)
    expect(confirmAct.isValidNextAction(actions.register.name)).toBe(false)
    expect(confirmAct.isValidNextAction(actions.confirm.name)).toBe(false)

describe "When calling unregister action", ->
  unregisterAct = actions.unregister

  it 'there are no next actions', () ->
    expect(unregisterAct.nextActions.length).toBe(0)
    expect(unregisterAct.isValidNextAction(actions.checkIn.name)).toBe(false)
    expect(unregisterAct.isValidNextAction(actions.unregister.name)).toBe(false)
    expect(unregisterAct.isValidNextAction(actions.register.name)).toBe(false)
    expect(unregisterAct.isValidNextAction(actions.confirm.name)).toBe(false)

describe "When calling checkIn action", ->
  checkInAct = actions.unregister

  it 'there are no next actions', () ->
    expect(checkInAct.nextActions.length).toBe(0)
    expect(checkInAct.isValidNextAction(actions.checkIn.name)).toBe(false)
    expect(checkInAct.isValidNextAction(actions.unregister.name)).toBe(false)
    expect(checkInAct.isValidNextAction(actions.register.name)).toBe(false)
    expect(checkInAct.isValidNextAction(actions.confirm.name)).toBe(false)

describe "Given register state", ->
  it 'it should be possible to unregister', () ->
    expect(actions.isValidNextAction(actions.register.endState, actions.unregister.name)).toBe(true)

  it 'it should be possible to confirm', () ->
    expect(actions.isValidNextAction(actions.register.endState, actions.confirm.name)).toBe(true)