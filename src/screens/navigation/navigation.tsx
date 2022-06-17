
import React, {useState, useEffect, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';
import SelectPlatform from '../addPlatform/selectPlatform';
import AddNew from '../addPlatform/addNew';
import { InitialState, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore, useDispatch } from '../../Store/StoreProvider'

export type RootStackParams = {
    Login: undefined;
    Dashboard: undefined;
    Add: undefined;
    Platform: undefined;
  }
  
const Stack = createNativeStackNavigator<RootStackParams>();

const Navigation = () => {
    const {user} = useStore();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
    <NavigationContainer>
        <Stack.Navigator>
            {
                user === null ? (
                    <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
                ) : ( 
                <>
                    <Stack.Screen options={{headerShown:false}} name="Dashboard" component={Dashboard} />
                    <Stack.Screen options={{headerTitle:"Add Platform"}} name="Platform" component={SelectPlatform} />
                    <Stack.Screen options={{headerTitle:"Add Platform"}} name="Add" component={AddNew} />
                </>
                )
            }
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Navigation;