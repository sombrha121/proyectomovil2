import React, { createContext, useState, useContext } from 'react';
// para añadir mas colores  a cambio de configuracion importante
const colorThemes = {
  amarilloClaro: '#FFF7D6',
  blanco: '#FFFFFF',
  naranja1: '#F59E0B',
  naranja2: '#F53C0B',
  grisClaro: '#C0C4C9',
  Verdementa:'#3CB371',
};

type ThemeKey = keyof typeof colorThemes;

type ThemeContextType = {
  themeColor: string;
  setThemeColorByKey: (key: ThemeKey) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  themeColor: colorThemes.blanco,
  setThemeColorByKey: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeColor, setThemeColor] = useState(colorThemes.blanco);

  const setThemeColorByKey = (key: ThemeKey) => {
    setThemeColor(colorThemes[key]);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColorByKey }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
