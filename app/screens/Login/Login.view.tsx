import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {CustomButton, CustomTextInput} from '../../components';
import {useTheme} from '../../context/ThemeContext';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen: React.FC = () => {
  const {themeColors} = useTheme();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '58619338574-fro022b1pva5qmk0obj9htlmkch2efqq'
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult: any = await GoogleSignin.signIn();
      let idToken = signInResult.idToken ?? signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log('🎉 User signed in successfully!', userCredential.user);
    } catch (error) {
      console.error('❌ Sign-in failed', error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: themeColors.background}}>
      {/* <CustomTextInput
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
      /> */}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          onGoogleButtonPress();
        }}
        disabled={false}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
