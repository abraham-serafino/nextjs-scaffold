import { createReducer } from "Common/SimpleStore"

const initialState = {
  userId: "",
  username: "",
  fullname: "",
  sessionToken: ""
}

const UserActions = {
  updateUser(oldUser, newUser) {
      return { ...oldUser, ...newUser }
  }
}

const userState = createReducer("userState", UserActions, initialState)

export { userState, UserActions }
