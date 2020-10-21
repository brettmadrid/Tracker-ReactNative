import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation'

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity 
      style={styles.signupButton} 
      onPress={() => navigation.navigate(routeName)}
    >
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  signupButton: {
    marginTop: -3
  },
  link: {
    color: 'blue'
  }
})

export default withNavigation(NavLink)