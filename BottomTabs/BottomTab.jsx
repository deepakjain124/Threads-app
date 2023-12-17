import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Setting from '../screens/Setting';
import HomeIcon from 'react-native-vector-icons/Octicons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import HeartIcon from 'react-native-vector-icons/AntDesign';
import ProfileIcon from 'react-native-vector-icons/SimpleLineIcons';
import SharePost from 'react-native-vector-icons/Feather';
import SearchScrren from '../screens/SearchScreen/SearchScrren';
import Likes from '../screens/Likes/Index';
import Profile from '../screens/Profile';
import Posts from '../screens/Posts';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size, focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? 'black' : 'white',
                  padding: 8,
                  borderRadius: 50,
                }}>
                <HomeIcon
                  className="bg-red-400"
                  name="home"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Search"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size, focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? 'black' : 'white',
                  padding: 8,
                  borderRadius: 50,
                }}>
                <SearchIcon
                  className="bg-red-400"
                  name="search"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
            );
          },
        }}
        component={SearchScrren}
      />
      <Tab.Screen
        name="Posts"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size, focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? 'black' : 'white',
                  padding: 8,
                  borderRadius: 50,
                }}>
                <SharePost
                  className="bg-red-400"
                  name="share"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
            );
          },
        }}
        component={Posts}
      />
      <Tab.Screen
        name="Likes"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size, focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? 'black' : 'white',
                  padding: 8,
                  borderRadius: 50,
                }}>
                <HeartIcon
                  className="bg-red-400"
                  name="hearto"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
            );
          },
        }}
        component={Likes}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size, focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? 'black' : 'white',
                  padding: 8,
                  borderRadius: 50,
                }}>
                <ProfileIcon
                  className="bg-red-400"
                  name="user"
                  size={20}
                  color={focused ? 'white' : 'black'}
                />
              </View>
            );
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
