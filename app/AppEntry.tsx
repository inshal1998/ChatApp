import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import RootStackNavigator from './routes/Root-Stack-Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from './constants/theme';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from './context/ThemeContext';


const AppEntry: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.secondary}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <GestureHandlerRootView style={{flex: 1}}>
          <ThemeProvider>
            <RootStackNavigator />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppEntry;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
