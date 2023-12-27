import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Likes from '../screens/Likes/Index';
import Contact from '../screens/Contacts/Contact';
import ContactForm from '../screens/Contacts/ContactForm';
import ContactDetail from '../screens/Contacts/ContactDetail';

const AddContact = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{animation: 'slide_from_bottom'}}
      initialRouteName="addContact">
      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
        name="Contacts"
        component={Contact}
      />
      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
        name="contactForm"
        component={ContactForm}
      />
      <Stack.Screen
        options={{
          animation: 'flip',
          headerShown: true,
          title:"",
          headerBackground:()=><Text className='bg-red-400'>ddd</Text>
        }}
        name="contactDetail"
        component={ContactDetail}
      />
    </Stack.Navigator>
  );
};

export default AddContact;
