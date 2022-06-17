import React, {useState, useEffect, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login/login';
import Dashboard from './src/screens/dashboard/dashboard';
import SelectPlatform from './src/screens/addPlatform/selectPlatform';
import AddNew from './src/screens/addPlatform/addNew';
import { InitialState, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase';
import StoreProvider from './src/Store/StoreProvider';
import Navigation from './src/screens/navigation/navigation';

export default function App() {
  return (
    <StoreProvider>
      <Navigation />
    </StoreProvider>
  );
}

