import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Home,
  Login
} from '../screens';
import {RootStackParamList} from './Navigation-Types';
import { CustomHeader } from '../components';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
          <Stack.Group
            screenOptions={({route}) => ({
              headerShown: false,
            })}>
            <Stack.Screen name="Login" component={Login}  options={{
              headerShown:true,
              header: () => <CustomHeader />,
            }}/>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;