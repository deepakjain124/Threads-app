import {View, Text, Modal, Alert, TouchableWithoutFeedback} from 'react-native';
import React from 'react';

const OptionModal = ({setVisivleModal, visblemodal}) => {
  return (
    <Modal animationType="slide"  transparent={true} visible={visblemodal}>
      <TouchableWithoutFeedback onPress={() => setVisivleModal(false)}>
        <View className="bg-transparent h-full">
          <Text></Text>
        </View>
      </TouchableWithoutFeedback>
      <View className="flex justify-start rounded-tl-3xl rounded-tr-3xl shadow-2xl shadow-gray-800 items-start px-8 absolute h-64 bottom-0 bg-white w-full">
        <View className="bg-gray-200 w-full rounded-lg py-4 px-4 mt-4">
          <Text className="text-black font-bold text-lg mb-2">Unfollow</Text>
          <View className='w-full h-[1px] bg-gray-300'></View>
          <Text className="text-black font-bold text-lg mb-2">Mute</Text>
        </View>
        <View className="bg-gray-200 w-full rounded-lg py-4 px-4 mt-4">
          <Text className="text-black font-bold text-lg mb-2">Hide</Text>
          <View className='w-full h-[1px] bg-gray-300'></View>
          <Text className="text-red-600 font-bold text-lg mb-2">Report</Text>
        </View>
      </View>
    </Modal>
  );
};

export default OptionModal;
