import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {CustomButton, CustomTextInput} from '../../components';
import {useTheme} from '../../context/ThemeContext';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LoginScreen: React.FC = () => {
  const {themeColors} = useTheme();

  const [email, setEmail] = useState('inshal@gmail.com');
  const [password, setPassword] = useState('Inshal@123');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const auth = getAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '58619338574-fro022b1pva5qmk0obj9htlmkch2efqq',
    });
  }, []);
  // async function onGoogleButtonPress() {
  //   try {
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //     const signInResult: any = await GoogleSignin.signIn();
  //     let idToken = signInResult.idToken ?? signInResult.data?.idToken;
  //     if (!idToken) {
  //       throw new Error('No ID token found');
  //     }
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     const userCredential = await auth().signInWithCredential(
  //       googleCredential,
  //     );
  //     console.log('🎉 User signed in successfully!', userCredential.user);
  //   } catch (error) {
  //     console.error('❌ Sign-in failed', error);
  //   }
  // }
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('New User Created', `Welcome, ${email}`);
      const uid = auth.currentUser?.uid;
      if (uid) {
        await firestore().collection('users').doc(uid).set({
          email,
          uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      navigation.replace('Home');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        try {
          const signInResult = await signInWithEmailAndPassword(auth, email, password);
          Alert.alert('Signed In', `Welcome back, ${signInResult.user.email}`);
          navigation.replace('Home');
        } catch (signInError: any) {
          Alert.alert('Sign-In Failed', signInError.message);
        }
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email', 'That email address is invalid!');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: themeColors.background}]}>
      <CustomTextInput
        placeholder="Enter Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <CustomTextInput
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton
        title="Login / Register"
        onPress={handleLogin}
        // isLoading={loading}
        buttonStyle={{backgroundColor: 'blue'}}
        textStyle={{fontSize: 18}}
      />
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          onGoogleButtonPress();
        }}
        disabled={false}
      /> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});
