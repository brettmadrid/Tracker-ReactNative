import createDataContext from "./createDataContext"

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const signup = (dispatch) => {
  return ({ email, password }) => {
    // make API request to sign up with email and password
    // if we sign up, modify our state and say we are authenticated
    // if signup fails, show error message
  }
}

const signin = (dispatch) => {
  return ({ email, password }) => {
    // make API request to sign in with email and password
    // if we sign in, modify our state and say we are authenticated
    // if signin fails, show error message
  }
}

const signout = (dispatch) => {
  return () => {
    // somehow sign out
  }
}

export const {Provider, Context} = createDataContext(
  authReducer, 
  { signin, signup, signout },
  { isSignedIn: false }
)
