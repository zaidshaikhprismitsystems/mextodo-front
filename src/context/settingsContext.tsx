import { createContext } from 'react';
import { THEMES } from '../utils/constants';
import useLocalStorage from '../hooks/useLocalStorage';

interface Settings {
  direction: 'ltr' | 'rtl';
  theme: string;
  activeLayout: string;
  responsiveFontSizes: boolean;
}

interface SettingsContextType {
  settings: Settings;
  saveSettings: (updateSettings: Settings) => void;
}

const initialSettings: Settings = {
  direction: 'ltr',
  theme: THEMES.LIGHT,
  activeLayout: 'layout1',
  responsiveFontSizes: true
};

export const SettingsContext: any = createContext<SettingsContextType | {}>({});

export default function SettingsProvider({
  children
}: any) {
  
  const storage = useLocalStorage('settings', initialSettings);
  
  const {
    data: settings,
    storeData: setStoreSettings
  } = storage;
  
  const saveSettings = (updateSettings: any) => setStoreSettings(updateSettings);
  

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}