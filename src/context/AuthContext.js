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
    default:
      return state;
  }
};

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