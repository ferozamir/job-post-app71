import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobPostScreen from '../screens/JobPostScreen';
import PostSuccessScreen from '../screens/PostSuccessScreen';
import PreviewSection from '../components/PreviewSection';
import ManageJobsScreen from '../screens/ManageJobsScreen';


const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={JobPostScreen} options={{ title: 'Post a Job' }} />
      <Stack.Screen name="Posted" component={PostSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Jobs" component={ManageJobsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
