import { StyleSheet, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomTextInput } from '../../components'
import withTheme from '../../hoc/withTheme'

const LoginScreen :React.FC<{ theme: any }> = ({ theme }) => {
  return (
    <View style={{ flex:1 , backgroundColor:theme.background }}>
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

export default (LoginScreen)

const styles = StyleSheet.create({})