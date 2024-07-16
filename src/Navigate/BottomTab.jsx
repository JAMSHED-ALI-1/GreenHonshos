import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import TaskManager from '../screens/TaskManager';
import Dashboard from '../screens/Dashboard';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'TaskManager') {
            iconName = 'create-sharp';
          } else if (route.name === 'Dashboard') {
            iconName = 'list-sharp';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen 
        name="TaskManager" 
        component={TaskManager} 
        options={{
          tabBarLabel: 'Task Manager',
          tabBarLabelStyle:{
            fontSize:14,
            marginBottom:10
           }
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          tabBarLabel: 'Dashboard',
           tabBarLabelStyle:{
            fontSize:14,
            marginBottom:10
           }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 80,
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
