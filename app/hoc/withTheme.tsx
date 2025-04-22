import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { themeConfig } from '../constants/theme';

const withTheme = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithTheme = (props: P) => {
    const theme = useSelector((state: RootState) => state.theme); // Access theme from Redux
    const themeColors = themeConfig[theme]; // Get theme-specific colors

    return <WrappedComponent {...props} theme={themeColors} />;
  };

  return ComponentWithTheme;
};

export default withTheme;