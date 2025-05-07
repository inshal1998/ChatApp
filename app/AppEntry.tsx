import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import RootStackNavigator from './routes/Root-Stack-Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from './constants/theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from './context/ThemeContext';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import auth from '@react-native-firebase/auth';
import { setUser, clearUser } from './redux/slice/authSlice';

const AuthWatcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return unsubscribe;
  }, []);

  return <RootStackNavigator />;
};

const AppEntry = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            translucent={false}
            backgroundColor={Colors.secondary}
            barStyle={'dark-content'}
          />
          <SafeAreaView style={styles.safeAreaViewStyle}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ThemeProvider>
                <AuthWatcher />
              </ThemeProvider>
            </GestureHandlerRootView>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppEntry;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
