import React, {useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home/Home';
import 'react-native-gesture-handler';
import BottomTab from './BottomTabs/BottomTab';
import {View, Text, ScrollView, StatusBar, SafeAreaView, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {storage} from './Storage/Storage';
import { Images } from './Controller';
const App = () => {
  const profile = {
    userName: 'Deepak Jain',
    Bio: '',
    Image:null,
  };
  const Posts = [];
  useEffect(() => {
    if (storage.getAllKeys().length === 0) {
      storage.set('userDetails', JSON.stringify(profile));
      storage.set('Posts', JSON.stringify(Posts));
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
  return (
    <>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
      {/* <SafeAreaView style={{backgroundColor:"white"}}>
   <StatusBar  animated={true} backgroundColor={"blue"} barStyle={"default"}/>
  <Home/>
   </SafeAreaView> */}
    </>
  );
};

export default App;
