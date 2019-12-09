import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = '@ServIsso:token';

export const onSignIn = token => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);
