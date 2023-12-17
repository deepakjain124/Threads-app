import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import Menu from 'react-native-vector-icons/Feather';
const Profile = ({navigation}) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerStyle={{width: '100%'}}
      screenOptions={{
        headerLeft: false,
        drawerPosition: 'right',
        headerRight: () => (
          <View onPress={() => navigation.openDrawer()} className="mr-8">
            <Menu name="menu" size={20} color="black" />
          </View>
        ),
      }}
      initialRouteName="Home">
      <Drawer.Screen
        options={{
          headerShown: true,
          headerTitle: '',
        }}
        name="Home"
        component={Main}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          headerTitle: '',
        }}
        name="Notifications"
        component={Main}
      />
    </Drawer.Navigator>
  );
};

export default Profile;
