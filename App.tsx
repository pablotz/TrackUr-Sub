import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/login';
import Dashboard from './screens/dashboard/dashboard';
import SelectPlatform from './screens/addPlatform/selectPlatform';
import AddNew from './screens/addPlatform/addNew';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';

export type RootStackParams = {
  Login: undefined;
  Dashboard: undefined;
  Add: undefined;
  Platform: undefined;
}

const Stack = createNativeStackNavigator<RootStackParams>();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
          <Stack.Screen options={{headerTitle:"Add Platform"}} name="Platform" component={SelectPlatform} />
          <Stack.Screen options={{headerTitle:"Add Platform"}} name="AddNew" component={AddNew} />
          <Stack.Screen options={{headerShown:false}} name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

