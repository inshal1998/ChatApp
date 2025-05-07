import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slice/themeSlice';
import { RootState } from '../redux/store';
import { themeConfig } from '../constants/theme';

interface CustomHeaderProps {
  title?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({title}:{title?:string}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const currentTheme = themeConfig[theme];

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>{title}</Text>
      <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
        <Text style={[styles.toggleText, { color: currentTheme.text }]}>
          {theme === 'light' ? '🌙' : '☀️'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    fontSize: 16,
  },
});