/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/appScreens/Home/Home';
import OnBoarding from './src/screens/authentication/OnBoarding/OnBoarding';
import SignIn from './src/screens/authentication/SignIn/SignIn';
import SignUp from './src/screens/authentication/SignUp/SignUp';
import auth from '@react-native-firebase/auth';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'simple_push'
      }}>
        {
          user ? 
          <Stack.Screen name='Home' component={Home} />
          :
          <>
            <Stack.Screen name='OnBoarding' component={OnBoarding} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={SignUp} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
