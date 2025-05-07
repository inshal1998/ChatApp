import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ChatScreen, Home, Login } from '../screens';
import { RootStackParamList } from './Navigation-Types';
import { CustomHeader } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'slide_from_right' , headerShown:false }}>
        {user ? (
          <Stack.Group>
            <Stack.Screen
            options={{
              headerShown: true,
              header: () => <CustomHeader title={"Home"}/>,
            }}
            name="Home" component={Home} />
            <Stack.Screen
            options={{
              headerShown: true,
              header: () => <CustomHeader title={"ChatScreen"}/>,
            }}
            name="ChatScreen" component={ChatScreen} />
        </Stack.Group>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              header: () => <CustomHeader title='Login'/>,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
