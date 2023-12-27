import React, {useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import BottomTab from './src/BottomTabs/BottomTab';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {storage} from './src/Storage/Storage';
import {Images} from './src/Controller';
import Auth from './screens/Auth/Auth';
import {getMkvData} from './src/Storage/StorageFun';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useAuthStore } from './src/Store';
const App = () => {
  const {loggedIn}=useAuthStore()
  const profile = {
    userName: 'Deepak Jain',
    Bio: '',
    userId:"",
    Image: null,
  };
  const Posts = [];
  const loggedInUser = false;
  useEffect(() => {
    if (storage.getAllKeys().length === 0) {
      storage.set('userDetails', JSON.stringify(profile));
      storage.set('Posts', JSON.stringify(Posts));
      storage.set('loggedInUser', loggedInUser);
    }
  }, []);
  useEffect(() => {
    const grantedcamera = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  }, []);
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <BottomTab />
        {/* {getMkvData('loggedInUser') ? (
        ) : (
          <Stack.Navigator initialRouteName="login">
            <Stack.Screen options={{
              headerShown:false
            }} name="login" component={Auth} />
          </Stack.Navigator>
        )} */}
      </NavigationContainer>
      {/* <SafeAreaView style={{backgroundColor:"white"}}>
   <StatusBar  animated={true} backgroundColor={"blue"} barStyle={"default"}/>
  <Home/>
   </SafeAreaView> */}
    </>
  );
};

export default App;
