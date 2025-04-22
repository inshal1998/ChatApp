import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Colors } from '../constants/theme';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme); // Access theme from Redux
  const statusBarColor = theme === 'light' ? Colors.background : Colors.primary;

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(statusBarColor, true); // Update background color for Android
    }
    StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content', true); // Update text color
  }, [theme, statusBarColor]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: statusBarColor }]}>
      <StatusBar
        backgroundColor={statusBarColor} // For Android
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} // For both platforms
      />
      {children}
    </SafeAreaView>
  );
};

export default ThemeProvider;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});