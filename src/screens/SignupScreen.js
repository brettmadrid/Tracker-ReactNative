import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {TouchableOpacity} from 'react-native'
import { Text, Input, Button, Image } from 'react-native-elements'
import Spacer from '../components/Spacer'

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Spacer>
        <Image 
          source={require('../../assets/PTMobile.png')}
          style={styles.image}
        />
        <Text style={styles.text} h3>
          Sign Up
        </Text>
      </Spacer>
      <Input
        label='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        autoCorrect={false}
      />
      <Spacer />
      <Input
        label='Password'
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Spacer>
        <Button title='Sign Up' />
        <Text>Already have an account?
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signin')}><Text style={styles.signupButtonText}>Sign in</Text></TouchableOpacity>
        </Text>
      </Spacer>
    </View>
  )
}

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  image: {
    width: '100%',
    height: 70,
    marginTop: 60
  },
  text: {
    marginBottom: 40,
    textAlign: 'center'
  },
  signupButton: {
    marginTop: -3
  },
  signupButtonText: {
    color: 'blue'
  }
})

export default SignupScreen
