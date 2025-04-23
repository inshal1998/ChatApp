import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/slice/themeSlice';
import { themeConfig } from '../constants/theme';

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const themeColors = themeConfig[theme];

  const toggle = () => dispatch(toggleTheme());

  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
