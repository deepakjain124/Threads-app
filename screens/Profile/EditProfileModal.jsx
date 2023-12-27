import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import React, { useState} from 'react';
import {Modal} from 'react-native';
import Lock from 'react-native-vector-icons/Ionicons';
import Close from 'react-native-vector-icons/AntDesign';
import EditBioModal from './EditBioModal';
import ProfileBottom from './ProfileBottom';
import { getMkvData } from '../../src/Storage/StorageFun';
import { Images } from '../../src/Controller';
import { Switch } from 'react-native-ui-lib';

const EditProfileModal = ({setOpenEditProfile, openEditProfile}) => {
  const [openBioModal, setOpenBioModal] = useState(false);
  const [openProfileBottomSheet, setOpenProfileBottom] = useState(false);
  const[isPrivate,setIsPrivate]=useState(false)

  return (
    <>
      <Modal
        onRequestClose={() => setOpenEditProfile(false)}
        animationType="slide"
        transparent={true}
        visible={openEditProfile}>
        <TouchableWithoutFeedback onPress={() => console.log(false)}>
          <>
            <View className="bg-white  px-4  h-full">
              <View className="px-4 py-4 flex-row justify-between items-center">
                <Text className="text-black text-lg font-bold">
                  <Close
                    onPress={() => setOpenEditProfile(false)}
                    name="close"
                    size={20}
                    color="black"
                  />{' '}
                  Edit profile
                </Text>
                <Text
                  onPress={() => setOpenEditProfile(false)}
                  className="text-black text-sm">
                  Done
                </Text>
              </View>
              <View className="flex justify-center items-center top-36">
                <View className=" rounded-lg px-4 shadow-md shadow-gray-400 border border-gray-200  pt-4    bg-white w-full">
                  <View className="flex-row justify-around items-start">
                    <View className="border-b border-gray-300 py-2">
                      <Text className="text-black text-sm font-bold">Name</Text>
                      <Text className="text-black mt-2">
                        <Lock name="lock-closed-outline" size={18} /> {getMkvData("userDetails").userName}({getMkvData("userDetails").userId})
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => setOpenProfileBottom(true)}>
                      <Image
                        source={!getMkvData("userDetails")?.Image?Images.DefaultImage:{uri:getMkvData("userDetails")?.Image}}
                        className="w-20 h-20 rounded-full"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => setOpenBioModal(true)}>
                    <View className="border-b border-gray-300 py-2">
                      <Text className="text-black font-bold mt-4">Bio</Text>
                      <Text className="text-black  mt-2 leading-5">
                        {getMkvData("userDetails").Bio}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                    <Switch value={isPrivate} onColor={"black"} onValueChange={(val) => setIsPrivate(val)}/>
                  </View>
                </View>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </Modal>
      <EditBioModal
        openBioModal={openBioModal}
        setOpenBioModal={setOpenBioModal}
      />
      <ProfileBottom
        isOpen={openProfileBottomSheet}
        setOPen={setOpenProfileBottom}
      />
    </>
  );
};

export default EditProfileModal;
