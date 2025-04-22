import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './app/routes/RootStackParamList';
import {Home, Login} from './app/screens';
import {Text, TextInput, StyleSheet} from 'react-native';
import {Colors} from './app/constants/theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './app/redux/store';
import {CustomHeader, ThemeProvider} from './app/components';
import withTheme from './app/hoc/withTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

(Text as any).defaultProps = (Text as any).defaultProps ?? {};
(Text as any).defaultProps.style = {fontFamily: 'Poppins-Regular'};

(TextInput as any).defaultProps = (TextInput as any).defaultProps ?? {};
(TextInput as any).defaultProps.style = {fontFamily: 'Poppins-Regular'};
const ThemedLoginScreen = withTheme(Login);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="Login"
                component={ThemedLoginScreen}
                options={{
                  headerShown: true,
                  header: () => <CustomHeader />,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
