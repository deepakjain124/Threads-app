import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import Contacts from 'react-native-contacts';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Call from 'react-native-vector-icons/Ionicons';
import Message from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-vector-icons/AntDesign';
import Mail from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
import Star from 'react-native-vector-icons/Entypo';
import Dots from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Edit from 'react-native-vector-icons/Feather';
import Delete from 'react-native-vector-icons/Feather';
import Block from 'react-native-vector-icons/Entypo';

const ContactDetail = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  console.log(data)
  const [contactDetail, setContactDetail] = useState(data);
  const [showOption, setShowOption] = useState(false);
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const toggleOption = () => {
    setShowOption(prev => !prev);
  };
  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: showOption ? 0 : 1,
      duration: 300,
      useNativeDriver: false, // Adjust this based on your requirements
    }).start();
  }, [showOption]);
  const OptionOpacity = opacityAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const handleStar = () => {
    // let temp = {...contactDetail};
    // temp = {...temp, isStarred: !temp.isStarred};
    // console.log({temp})
    // Contacts.updateContact(temp)
    //   .then(res => {
    //     setContactDetail(res)
    //   })
    //   .catch(err => console.log(err));
  };
  const handleBlock=()=>{
    let temp = {...contactDetail};
    temp = {...temp, "isBlocked": true};
    console.log({temp})
    Contacts.updateContact(temp)
      .then(res => {
        setContactDetail(res)
      })
      .catch(err => console.log(err));
  }
  const handleDelete = () => {
    Contacts.deleteContact({recordID: contactDetail.recordID})
      .then(recordId => {
        navigation.navigate('Contacts', {
          update: true,
        });
      })
      .catch(err => console.log(err));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color="black" size={20} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex flex-row justify-around items-center space-x-5">
          <Star
            onPress={handleStar}
            name={`${
              contactDetail.isStarred === true ? 'star' : 'star-outlined'
            }`}
            color={`${contactDetail.isStarred === true ? 'gold' : 'black'}`}
            size={20}
          />
          <TouchableOpacity onPress={toggleOption}>
            <Dots name="dots-three-vertical" color="black" size={20} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  return (
    <>
      <ScrollView>
        <View>
          <View className="flex flex-col justify-center items-center mt-20">
            {contactDetail.thumbnailPath !== '' ? (
              <Image
                source={{uri: contactDetail.thumbnailPath}}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <Text className=" bg-purple-500 text-white px-6 py-4 rounded-full text-3xl flex justify-center items-center font-bold">
                {contactDetail.displayName.charAt(0)}
              </Text>
            )}
            <Text className="text-black text-lg mt-4">
              {contactDetail.displayName}
            </Text>
            <Text className="text-black text-xs mt-2">
              {contactDetail.company} {contactDetail.jobTitle}
            </Text>
          </View>
          <View className="flex flex-row justify-around mt-8 items-center">
            <View>
              <View className="bg-gray-400 flex-col flex justify-center items-center p-4 rounded-full">
                <Call size={20} name="call-outline" color="white" />
              </View>
              <Text className="text-center text-black mt-1">Call</Text>
            </View>
            <View>
              <View className="bg-gray-400 flex-col flex justify-center items-center p-4 rounded-full">
                <Message
                  size={20}
                  name="message-processing-outline"
                  color="white"
                />
              </View>
              <Text className="text-center text-black mt-1">Message</Text>
            </View>
            <View>
              <View className="bg-gray-400 flex-col flex justify-center items-center p-4 rounded-full">
                <Video size={20} name="videocamera" color="white" />
              </View>
              <Text className="text-center text-black mt-1">Video</Text>
            </View>
          </View>
          <View className="flex justify-center items-center mx-8 my-6 h-[1px] bg-gray-400"></View>
          {contactDetail.phoneNumbers.length !== 0 &&
            contactDetail.phoneNumbers.map((i, index) => (
              <View
                key={index}
                className="flex px-8 mb-4 flex-row justify-between items-center">
                <View className="flex justify-start items-center flex-row space-x-4">
                  {index === 0 ? (
                    <Call name="call-outline" size={20} color="black" />
                  ) : (
                    <Text>&nbsp; &nbsp; &nbsp;</Text>
                  )}
                  <View>
                    <Text className="text-black">{i.number}</Text>
                    <Text className="text-black">{i.label}</Text>
                  </View>
                </View>
                <View className="bg-gray-400 flex-col flex justify-center items-center p-4 rounded-full">
                  <Message
                    size={20}
                    name="message-processing-outline"
                    color="white"
                  />
                </View>
              </View>
            ))}
          {contactDetail.emailAddresses.length !== 0 &&
            contactDetail.emailAddresses.map((i, index) => (
              <View
                key={index}
                className="flex px-8 mb-4 flex-row justify-between items-center">
                <View className="flex justify-start items-center flex-row space-x-4">
                  {index === 0 ? (
                    <Mail name="mail" size={20} color="black" />
                  ) : (
                    <Text>&nbsp; &nbsp; &nbsp;</Text>
                  )}
                  <View>
                    <Text className="text-black">{i.email}</Text>
                    <Text className="text-black">{i.label}</Text>
                  </View>
                </View>
              </View>
            ))}
          {contactDetail.imAddresses.length !== 0 &&
            contactDetail.imAddresses.map((i, index) => (
              <View
                key={index}
                className="flex px-8 mb-4 flex-row justify-between items-center">
                <View className="flex justify-start items-center flex-row space-x-4">
                  {index === 0 ? (
                    <Message
                      size={20}
                      name="message-processing-outline"
                      color="black"
                    />
                  ) : (
                    <Text>&nbsp; &nbsp; &nbsp;</Text>
                  )}
                  <View>
                    <Text className="text-black">{i.username}</Text>
                    <Text className="text-black">{i.service}</Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <Animated.View
        style={{opacity: OptionOpacity}}
        className="flex justify-around bg-purple-500 mx-8 py-3 rounded-full  items-center flex-row">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('contactForm', {
              data,
            })
          }>
          <Edit size={20} color="white" name="edit" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Block
            onPress={() => handleBlock()}
            size={20}
            color="white"
            name="block"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Delete
            onPress={() => handleDelete()}
            size={20}
            color="white"
            name="trash"
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default ContactDetail;
