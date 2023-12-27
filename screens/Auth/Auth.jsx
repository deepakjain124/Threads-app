import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ThreadsLOgo from 'react-native-vector-icons/FontAwesome6';
import Camera from 'react-native-vector-icons/Feather';
import {
  handleCameraLaunch,
  openImagePicker,
} from '../../src/Controller/CameraFun';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {ActionSheet, Image} from 'react-native-ui-lib';
import {Images} from '../../src/Controller';
import { setMkvData } from '../../src/Storage/StorageFun';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../src/Store';
const Auth = () => {
  const navigation=useNavigation()
  const {AuthorizeUser}=useAuthStore
  const [openActionSheet, setOpenActionSheet] = useState(false);
  const [image, setImage] = useState(null);
  const validationSchema = yup.object().shape({
    Name: yup.string().required('Please, Enter Name!'),
    UserId: yup.string().required("Please, Enter I'd!"),
  });
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setErrors,
  } = useFormik({
    initialValues: {Name: '', UserId: '',Bio:""},
    onSubmit: ({Name, UserId,Bio}) => {
      const data={
        userName:Name,Bio:Bio,Image:image,userId:UserId
      }
      setMkvData("userDetails",data)
      setMkvData("loggedInUser",true)
      // AuthorizeUser()
    },
    validationSchema,
  });
  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View className="flex-col mx-12 justify-center items-center h-screen">
            {image ? (
              <TouchableOpacity onPress={() => setOpenActionSheet(true)}>
                <Image  
                source={{uri: image}}
                className="w-28 mb-4 h-28 rounded-full"
              />
              </TouchableOpacity>
            ) : (
              <View className="w-28 mb-4 relative h-28 rounded-full flex justify-center items-center bg-gray-300">
                <Camera
                  onPress={() => setOpenActionSheet(true)}
                  name="camera"
                  size={30}
                  color="black"
                />
                {/* <TouchableOpacity
                onPress={() => setOpenActionSheet(true)}
                className="absolute right-0 bottom-0">
                <Text  className=" absolute right-2 bg-black px-2 py-1 rounded-full flex-row  justify-center items-center text-white bottom-1">
                  +
                </Text>
              </TouchableOpacity> */}
              </View>
            )}
            <TextInput
              placeholder="Enter name"
              onChangeText={handleChange('Name')}
              onBlur={handleBlur('Name')}
              value={values.Name}
              placeholderTextColor={'black'}
              className="  px-4 rounded-lg text-black bg-gray-200  w-full"
            />
            <View className="flex-row justify-start items-start  w-full">
              <Text className="text-red-600  my-2">
                {touched['Name'] && errors['Name'] ? errors['Name'] : ''}
              </Text>
            </View>
            <TextInput
              placeholder="Enter I'd"
              onChangeText={handleChange('UserId')}
              onBlur={handleBlur('UserId')}
              value={values.UserId}
              placeholderTextColor={'black'}
              className=" px-4 rounded-lg text-black bg-gray-200  w-full"
            />
            <View className="flex-row justify-start items-start  w-full">
              <Text className="text-red-600  my-2">
                {touched['Name'] && errors['UserId'] ? errors['UserId'] : ''}
              </Text>
            </View>
            <TextInput
              placeholder="Enter Bio"
              onChangeText={handleChange('Bio')}
              onBlur={handleBlur('Bio')}
              value={values.Bio}
              placeholderTextColor={'black'}
              className=" px-4 rounded-lg text-black bg-gray-200  w-full"
            />
            <TouchableOpacity onPress={handleSubmit} className="w-full">
              <Text className="bg-black w-full text-center rounded-lg py-4 my-4 font-bold text-lg text-white">
                Enter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {openActionSheet && (
        <ActionSheet
          title={'Picker'}
          dialogStyle={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}
          visible={openActionSheet}
          onDismiss={() => setOpenActionSheet(false)}
          showCancelButton={true}
          message={'Message goes here'}
          options={[
            {
              label: 'Pick from gallery',
              onPress: () => openImagePicker(setImage),
            },
            {label: 'Pick from camera', onPress: () => handleCameraLaunch(setImage)},
            {label: 'Cancel', onPress: () => setOpenActionSheet(false)},
          ]}
        />
      )}
    </View>
  );
};

export default Auth;
