import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Close from 'react-native-vector-icons/AntDesign';
import Check from 'react-native-vector-icons/AntDesign';
import CloseCircle from 'react-native-vector-icons/AntDesign';
import { getMkvData, setMkvData } from '../../Storage/StorageFun';

const EditBioModal = ({openBioModal, setOpenBioModal}) => {
  const [bio, setBio] = useState('');
  useEffect(()=>{
    const get=getMkvData("userDetails")
    setBio(get.Bio)
    },[])
    const handleSave=()=>{
        const get=getMkvData("userDetails")
    let temp={...get}
    temp["Bio"]=bio
    setMkvData("userDetails",temp)
    setOpenBioModal(false)
    }
  return (
    <>
      <Modal
        onRequestClose={() => setOpenBioModal(false)}
        animationType="slide"
        transparent={true}
        visible={openBioModal}>
        <TouchableWithoutFeedback onPress={() => console.log(false)}>
          <>
            <View className="bg-white  px-4  h-full">
              <View className="px-4 py-4 flex-row justify-between items-center">
                <Close
                  onPress={() => setOpenBioModal(false)}
                  name="close"
                  size={25}
                  color="black"
                />
                <Text
                  onPress={() => setOpenBioModal(false)}
                  className="text-black text-lg">
                  Edit
                </Text>
                <Check
                  onPress={() => (bio === '' ? {} : handleSave())}
                  name="check"
                  size={25}
                  color={bio === '' ? 'lightgray' : 'black'}
                />
              </View>
              <View className="border border-gray-300 rounded-lg p-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-black text-{12px} font-bold">Bio</Text>
                  <CloseCircle size={15} name="closecircle" color="gray" />
                </View>
                <TextInput
                  multiline={true}
                  value={bio}
                  numberOfLines={2}
                  onChangeText={v => setBio(v)}
                  placeholder="Enter Bio"
                  className="text-black"
                />
              </View>

              {/* <View className="flex justify-center items-center top-36">
                <View className=" rounded-lg px-4 shadow-md shadow-gray-400 border border-gray-200  pt-4    bg-white w-full">
                  <View className="flex-row justify-around items-start">
                    <View className="border-b border-gray-300 py-2">
                      <Text className="text-black text-sm font-bold">Name</Text>
                      <Text className="text-black mt-2">
                        <Lock name="lock-closed-outline" size={18} /> Deepak
                        Jain (_beingdeepakjain_)
                      </Text>
                    </View>
                    <Image
                      source={Images.Photo}
                      className="w-14 h-14 rounded-full"
                    />
                  </View>
                  <View className="border-b border-gray-300 py-2">
                    <Text className="text-black font-bold mt-4">Bio</Text>
                    <Text className="text-black  mt-2 leading-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ab quasi nulla,libero.
                    </Text>
                  </View>
                  <View className="border-b border-gray-300 py-2">
                    <Text className="text-black font-bold mt-4">Link</Text>
                    <Text className="text-black  mt-2 leading-5">
                      + Add Link.
                    </Text>
                  </View>
                  <View className=" flex-row justify-between  items-cente py-6">
                    <Text className="text-black font-bold ">
                      Private profile
                    </Text>
                    <Text className="text-black   leading-5">
                      Private Profile
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
          </>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default EditBioModal;
