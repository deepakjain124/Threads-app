import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Close from 'react-native-vector-icons/AntDesign';
import {getMkvData, setMkvData} from '../../Storage/StorageFun';
import {Images} from '../../Controller';
import PaperClick from 'react-native-vector-icons/SimpleLineIcons';
import CloseCircle from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
const Posts = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState(null);
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };
  const handlePost = () => {
    const data = {
      message,
      image: selectedImage,
    };
    const getAllPost=getMkvData("Posts")
    let tempData=[...getAllPost,data]
    setMkvData('Posts', tempData);
    navigation.goBack();
  };
  return (
    <>
      <View className="mx-2">
        <View className="flex-row mt-4 gap-x-4 justify-between items-center">
          <View className="flex-row gap-x-4 justify-start items-center">
           <TouchableOpacity onPress={()=>{
            setSelectedImage("")
            setMessage("")
            navigation.goBack()
           }}>
           <Close  size={25} color="black" name="close" />
           </TouchableOpacity>
            <Text className="text-black text-lg font-bold">New Post</Text>
          </View>
          <Text
            onPress={handlePost}
            className={`${
              message || selectedImage ? 'text-blue-600' : 'text-blue-300'
            } text-lg font-bold`}>
            {' '}
            Post
          </Text>
        </View>
      </View>
      <View className="h-[1px] mt-5 w-full bg-gray-400"></View>
      <View className="mx-4">
        <View className="flex-row mt-4 gap-x-2 justify-start items-start">
          <Image
            className="w-12 h-12 rounded-full"
            source={!getMkvData("userDetails")?.Image?Images.DefaultImage:{uri:getMkvData("userDetails")?.Image}}
          />
          <View className="w-full">
            <Text className="text-black  font-semibold">_beingdeepakjain_</Text>
            <TextInput
              multiline={true}
              placeholder="Start a post"
              value={message}
              onChangeText={v => setMessage(v)}
              className="text-black  w-9/12   px-2"
              placeholderTextColor={'gray'}
            />
            <TouchableOpacity onPress={openImagePicker}>
              <PaperClick size={15} color="gray" name="paper-clip" />
            </TouchableOpacity>
          </View>
        </View>
        {selectedImage ? (
          <View className="ml-12 mt-2 relative w-9/12">
            <Image
              source={{uri: selectedImage}}
              className="w-full h-96 rounded-3xl"
            />
            <Text className="text-white absolute  top-5 right-6">
              <TouchableOpacity onPress={() => setSelectedImage(null)}>
                <CloseCircle size={18} name="closecircle" color="gray" />
              </TouchableOpacity>
            </Text>
          </View>
        ) : (
          ''
        )}
      </View>
    </>
  );
};

export default Posts;
