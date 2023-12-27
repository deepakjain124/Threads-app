import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {Images} from '../../src/Controller';
import {FlashList} from '@shopify/flash-list';
import {useAuthStore} from '../../src/Store';
import Add from 'react-native-vector-icons/AntDesign';
import Search from 'react-native-vector-icons/FontAwesome';
import Close from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const Contact = ({route}) => {
  const navigation = useNavigation();
  const {contactList, setContactList} = useAuthStore();
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setshowSearch] = useState(false);
  const widthAnimation = useRef(new Animated.Value(0)).current;

  const toggleSearchBar = () => {
    setshowSearch(prev => !prev);
    Animated.timing(widthAnimation, {
      toValue: showSearch ? 0 : 1,
      duration: 300,
      useNativeDriver: false, // Adjust this based on your requirements
    }).start();
  };

  const searchBarWidth = widthAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'],
  });
  useEffect(() => {
    console.log('lkheflwehflewhflkwhekhf');
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);
        Contacts.getAll()
          .then(contacts => {
            // work with contacts
            setContactList(
              contacts.sort((a, b) => {
                if (a.displayName < b.displayName) {
                  return -1;
                } else {
                  return 1;
                }
              }),
            );
            setList(
              contacts.sort((a, b) => {
                if (a.displayName < b.displayName) {
                  return -1;
                } else {
                  return 1;
                }
              }),
            );
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  }, [route.params]);
  const RenderItem = ({item}) =>
    useMemo(() => {
      return (
        <TouchableOpacity onPress={()=>navigation.navigate("contactDetail",{
          data:item
        })}>
          <View className="my-1">
            <View className="flex p-1 rounded-lg flex-row space-x-4 justify-start items-center">
              <Image
                source={
                  item.thumbnailPath
                    ? {uri: item.thumbnailPath}
                    : Images.DefaultImage
                }
                className="rounded-full w-12 h-12"
              />
              <View>
                <Text className="text-black text-lg font-semibold">
                  {item.displayName}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }, [contactList,list]);

  const handleSearch = v => {
    let temp = [...list];
    temp = temp.filter(i => i.displayName.toLowerCase().includes(v.toLowerCase()));
    setContactList(temp);
  };

  return (
    <View className="relative mx-3">
        <View className="rounded-lg mt-4  flex flex-row justify-between items-center p-2">
          {!showSearch ? (
            <TouchableOpacity onPress={toggleSearchBar}>
              <Text className="bg-purple-600 p-3 rounded-full">
                <Search name="search" size={15} color="white" />
              </Text>
            </TouchableOpacity>
          ) : (
            <Animated.View
              style={{width: searchBarWidth}}
              className=" flex-row justify-around items-center px-4 border border-gary-500 rounded-2xl">
              <TextInput
                onChangeText={v => handleSearch(v)}
                placeholderTextColor={'black'}
                className=" px-4  text-black w-full"
                placeholder="Search contact"
              />
              <Text className="bg-purple-600 p-[2px] rounded-full">
                <Close
                  onPress={()=>{
                    toggleSearchBar()
                    setContactList(list)
                  }}
                  name="close"
                  size={12}
                  color="white"
                />
              </Text>
            </Animated.View>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('contactForm')}>
            <Text className="bg-purple-600 p-3 rounded-full">
              <Add name="plus" size={15} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      <FlatList
      ListEmptyComponent={<View className='flex-col justify-center mt-52 items-center'>
        <Image source={Images.Nodata} className='w-12 h-12'/>
        <Text className='text-black mt-2 text-lg'>No Contact</Text>
        </View>}
        renderItem={({item}) => <RenderItem item={item} />}
        data={contactList}
        className="mt-1"
        keyExtractor={item => item.recordID}
      />
    </View>
  );
};

export default Contact;
