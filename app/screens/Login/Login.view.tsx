import { StyleSheet, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomTextInput } from '../../components'
import { useTheme } from '../../context/ThemeContext';


const LoginScreen :React.FC = () => {
  const { themeColors, toggle } = useTheme();
  return (
    <View style={{ flex:1  , backgroundColor:themeColors.background }}>
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