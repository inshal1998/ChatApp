const Colors = {
  primary: '#4A90E2',
  secondary: '#FF6F61',
  background: '#FFFFFF',
  border: '#CCCCCC',
  textPrimary: '#000000',
  textSecondary: '#888888',
  disabled: '#D3D3D3',
};


const themeConfig = {
  light: {
    background: Colors.background, 
    text: Colors.textPrimary,
  },
  dark: {
    background: Colors.textPrimary,
    text: Colors.background,
  },
};


export {Colors , themeConfig};
