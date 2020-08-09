import { connect } from "react-redux"
import { createStore, combineReducers } from "redux"

const createActions = (actions) => {
  const actionCreators = {}

  for (const actionName of Object.getOwnPropertyNames(actions)) {
    actionCreators[actionName] = (payload) =>
        ({ type: actionName, payload })
  }

  return actionCreators;
}

const createContainer = (Component, methods) =>
  connect((state) => state, createActions(methods))
      (Component)

const createReducer = (name, methods, initialState) => ({
  [name](state = initialState, action = {}) {
    const { type = "", payload } = action

    const actions = { ...methods }

    if (type.startsWith("@@redux")) {
      return state
    }

    if (actions[type]) {
      return actions[type](state, payload)
    }

    return state
  }
})

function createSimpleStore(...reducers) {
  const newReducers = reducers.reduce(
    (obj, reducer) => ({ ...obj, ...reducer }),
    {})

  return createStore(combineReducers(newReducers))
}

export {
  createActions,
  createContainer,
  createReducer,
  createSimpleStore
  }
