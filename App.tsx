import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {Colors} from './app/constants/theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './app/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppEntry from './app/AppEntry';

(Text as any).defaultProps = (Text as any).defaultProps ?? {};
(Text as any).defaultProps.style = {fontFamily: 'Poppins-Regular'};

(TextInput as any).defaultProps = (TextInput as any).defaultProps ?? {};
(TextInput as any).defaultProps.style = {fontFamily: 'Poppins-Regular'};
const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <AppEntry />
      </SafeAreaProvider>
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
