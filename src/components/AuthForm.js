import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, Input, Image } from 'react-native-elements'
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, buttonText }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Spacer>
        <Image 
          source={require('../../assets/TrackerLogo.png')}
          style={styles.image}
        />
        <Text style={styles.text} h3>
          {headerText}
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
      {errorMessage ? <Text style={styles.errMsg} >{errorMessage}</Text> : null}
      <Spacer>
        <Button title={buttonText} onPress={() => onSubmit({email, password})}/>
      </Spacer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  errMsg: {
    fontSize: 16,
    marginLeft: 15,
    color: 'red'
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 120
  },
  text: {
    marginBottom: 40,
    textAlign: 'center'
  },
})

export default AuthForm