import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'signin':
      return { errorMessage: '', token: action.payload }
    case 'clear_error_message':
          return {
                email: '', password: '', errorMessage: ''
          }
    case 'signout':
          return {
                token: null, errorMessage: ''
          }
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
            dispatch({ type: 'signin', payload: token })
            navigate('TrackList')
      } else {
            navigate('Signup')
      }
}

const clearErrorMessage = dispatch => () => {
      dispatch({ type: 'clear_error_message'})
}

const signup = dispatch => async ({ email, password }) => {
    try {
      // send user data to api
      const response = await trackerApi.post('/signup', { email, password });
      console.log('response.data', response.data)

      // store token in local storage
      await AsyncStorage.setItem('token', response.data.token)

      // update state with token value
      dispatch({type: 'signin', payload: response.data.token })

      // navigate to main flow after signing in
      navigate('mainFlow')

    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up'
      });
    }
 };

const signin = dispatch => async ({ email, password }) => {
      try {
      // send user data to api
      const response = await trackerApi.post('/signin', { email, password });

      // store token in local storage
      await AsyncStorage.setItem('token', response.data.token)

      // update state with token value
      dispatch({type: 'signin', payload: response.data.token })

      // navigate to main flow after signing in
      navigate('mainFlow')

    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up'
      });
    }
 };

const signout = dispatch => async () => {
      try {
            await AsyncStorage.removeItem('token')
            dispatch({type: 'signout'})
            navigate('loginFlow')
      } catch (err) {
            dispatch({
                  type: 'add_error',
                  payload: 'Failed to signout!'
            })
      }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);