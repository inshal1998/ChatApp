import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Login: { theme: { background: string; text: string } };
};

export type StackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export type StackRouteProps = RouteProp<RootStackParamList>;