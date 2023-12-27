import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {Animated} from 'react-native';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Heart from 'react-native-vector-icons/Feather';
import Message from 'react-native-vector-icons/Feather';
import Share from 'react-native-vector-icons/Octicons';
import AddICon from 'react-native-vector-icons/MaterialIcons';
import EditProfileModal from './EditProfileModal';
import {useNavigation} from '@react-navigation/native';
import ActionDeleteSheet from './ActionDeleteSheet';
import { getMkvData } from '../../src/Storage/StorageFun';
import { Images } from '../../src/Controller';
const ProfileTab = ({setOpenEditProfile, openEditProfile}) => {
  const navigation = useNavigation();
  const [color, setColor] = useState('black'); // Initial color state
  const [bounceValue] = useState(new Animated.Value(1));
  const [allPosts, setAllPosts] = useState([]);
  const [deletedIndex, setDeletedIndex] = useState(null);
  const [visblemodal, setVisivleModal] = useState(false);
  const handlePress = () => {
    // Reduce the size of the icon briefly to create a bounce effect
    Animated.sequence([
      Animated.timing(bounceValue, {
        duration: 100,
        toValue: 1.5,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Update the color state to red on click
    setColor(color === 'red' ? 'black' : 'red');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const myPosts = getMkvData('Posts').reverse();
      console.log('Screen 2 is focused', allPosts);
      setAllPosts(myPosts);
    });

    return () => {
      unsubscribe();
      console.log('Screen 2 is unfocused or unmounted');
    };
  }, [navigation]);
  const animatedStyle = {
    transform: [{scale: bounceValue}],
  };
  return (
    <>
      <View className="flex-row justify-between mt-5 items-center">
        <TouchableOpacity>
          <View className="border-b border-black py-4 px-16">
            <Text className="text-black">Threads</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className=" px-16 py-4">
            <Text className="text-black">Replies</Text>
          </View>
        </TouchableOpacity>
      </View>
      {allPosts.length !== 0 ? (
        allPosts.map((i, index) => {
          return (
            <View key={index}>
              <View className="mt-4">
                <View className="flex-row justify-between mx-3 items-start">
                  <View className="flex-row justify-between items-start gap-4">
                    <View className="relative">
                      <Image
                        className="w-12 h-12 rounded-full"
                        source={
                          getMkvData('userDetails').Image === null
                            ? Images.DefaultImage
                            : {uri: getMkvData('userDetails')?.Image}
                        }
                      />
                      {/* <Text className="text-black absolute text-xl right-0 -bottom-1 border border-black bg-white rounded-full w-4 h-4  flex-col justify-center items-center">
                  +
                </Text> */}
                    </View>
                    <View>
                      <Text className="text-black font-bold text-lg">
                        Deepak Jain
                      </Text>
                      <Text className="text-black">{i.message ?? ''}</Text>
                    </View>
                  </View>
                  <View className="flex-row gap-2 justify-between items-center">
                    <Text className="text-black">11h</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setDeletedIndex(index);
                        setVisivleModal(true);
                      }}>
                      <Icon
                        name="dots-three-horizontal"
                        size={20}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <View className="flex-col  mt-2   justify-center items-start"> */}
              <View className="w-full mt-2 px-16">
                <Image
                  className="w-full h-96 rounded-2xl"
                  source={{uri: i.image}}
                />
              </View>
              <View className="flex-row mt-4 pl-16 justify-start gap-x-5  w-full items-center">
                <TouchableOpacity onPress={handlePress}>
                  <Animated.View style={[animatedStyle]}>
                    <Icon name="heart" size={25} color={color} />
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Message name="message-circle" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Share name="share" size={25} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            //   </View>
          );
        })
      ) : (
        <View className="flex-col justify-center items-center mt-20">
          <TouchableOpacity onPress={()=>navigation.navigate("Posts")}>
            <View className="bg-gray-200 border border-gray-300 mb-2 w-20 h-20 flex justify-center items-center rounded-full">
              <AddICon name="add" size={40} color="black" />
            </View>
            <Text className="text-black font-bold text-lg">Add Posts</Text>
          </TouchableOpacity>
        </View>
      )}
      {visblemodal && (
        <ActionDeleteSheet
          setData={setAllPosts}
          data={allPosts}
          index={deletedIndex}
          visblemodal={visblemodal}
          setVisivleModal={setVisivleModal}
        />
      )}
      <EditProfileModal
        setOpenEditProfile={setOpenEditProfile}
        openEditProfile={openEditProfile}
      />
    </>
  );
};

export default ProfileTab;
