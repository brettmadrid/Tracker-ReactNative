import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'signup':
      return { errorMessage: '', token: action.payload}
    default:
      return state;
  }
};

const signup = dispatch => async ({ email, password }) => {
  console.log('email', email)
  console.log('password', password)
    try {
      // send user data to api
      const response = await trackerApi.post('/signup', { email, password });
      console.log('response.data', response.data)

      // store token in local storage
      await AsyncStorage.setItem('token', response.data.token)

      // update state with token value
      dispatch({type: 'signup', payload: response.data.token })

      // navigate to main flow after signing in
      navigate('mainFlow')

    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up'
      });
    }
 };

const signin = dispatch => {
  return ({ email, password }) => {
    // Try to signin
    // Handle success by updating state
    // Handle failure by showing error message (somehow)
  };
};

const signout = dispatch => {
  return () => {
    // somehow sign out!!!
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: '' }
);