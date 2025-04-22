import { StyleSheet, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomTextInput } from '../../components'

const LoginScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <CustomTextInput
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        showCountryCode
        onChangeText={(text) => console.log('Phone:', text)}
        onCountryChange={(country) => console.log('Selected country:', country)}
      />
      <CustomButton
        title="Submit"
        onPress={()=>console.log('Btn Pressed')}
        isLoading={false}
        buttonStyle={{ backgroundColor: 'blue' }}
        textStyle={{ fontSize: 18 }}
      />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})