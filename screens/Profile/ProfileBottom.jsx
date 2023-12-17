import {
  View,
  Text,
  Modal,
  Permission,
  PermissionsAndroid,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import { getMkvData, setMkvData } from '../../Storage/StorageFun';
const ProfileBottom = ({setOPen, isOpen}) => {
  const [selectedImage, setSelectedImage] = useState(null);

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
        const get=getMkvData("userDetails")
        let temp={...get}
        temp["Image"]=imageUri
        setMkvData("userDetails",temp)
        setOPen(false)
        setSelectedImage(imageUri);
      }
    });
  };
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        const get=getMkvData("userDetails")
        let temp={...get}
        temp["Image"]=imageUri
        setMkvData("userDetails",temp)
        setOPen(false)
        console.log(imageUri)
      }
    });
  };
  const handleRemove=()=>{
    const data=getMkvData("userDetails")
    let temp={...data}
    temp["Image"]=null
    setMkvData("userDetails",temp)
    setOPen(false)
  }
  return (
    <Modal onRequestClose={()=>setOPen(false)} animationType="slide" transparent={true} visible={isOpen}>
      <TouchableWithoutFeedback onPress={() => setOPen(false)}>
        <View className="bg-transparent h-full">
          <Text></Text>
        </View>
      </TouchableWithoutFeedback>
      <View className="flex justify-start rounded-tl-3xl rounded-tr-3xl border border-gray-200 items-start px-8 absolute h-42 bottom-0 bg-white w-full">
        <View className="w-full rounded-lg py-2 px-4 mt-4">
          <TouchableOpacity onPress={handleCameraLaunch}>
            <Text className="text-black font-semibold text-lg ">
              New profile picture from camera
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full rounded-lg py-2 px-4 mt-4">
          <TouchableOpacity onPress={openImagePicker}>
            <Text className="text-black font-semibold text-lg ">
              New profile picture from galary
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" w-full rounded-lg py-2 px-4 ">
          <TouchableOpacity onPress={()=>handleRemove()}>
            <Text className="text-red-600 font-semibold text-lg ">
              Remove profile picture
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileBottom;
