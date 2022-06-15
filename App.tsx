import React, {useState, useEffect, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/login';
import Dashboard from './screens/dashboard/dashboard';
import SelectPlatform from './screens/addPlatform/selectPlatform';
import AddNew from './screens/addPlatform/addNew';
import { InitialState, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';
import StoreProvider from './Store/StoreProvider';
import Navigation from './screens/navigation/navigation';

export default function App() {
  return (
    <StoreProvider>
      <Navigation />
    </StoreProvider>
  );
}

