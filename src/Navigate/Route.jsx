import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import TaskManager from '../screens/TaskManager';
import Dashboard from '../screens/Dashboard';



const Stack = createNativeStackNavigator();

const Route=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>

        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name='TaskManager' component={TaskManager}/>
        <Stack.Screen name='Dashboard' component={Dashboard}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route

const styles = StyleSheet.create({})