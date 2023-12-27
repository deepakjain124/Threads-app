import {
  View,
  Text,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import { setMkvData } from '../../src/Storage/StorageFun';

const ActionDeleteSheet = ({
  setVisivleModal,
  visblemodal,
  setData,
  data,
  index,
}) => {
  console.log(index);
  const handleDelete = useCallback(() => {
    let temData = [...data];
    data.splice(index, 1);
    setMkvData('Posts', data);
    setData(data);
    setVisivleModal(false);
  }, [visblemodal]);

  return (
    <Modal
      onRequestClose={() => setVisivleModal(false)}
      animationType="slide"
      transparent={true}
      visible={visblemodal}>
      <TouchableWithoutFeedback onPress={() => setVisivleModal(false)}>
        <View className="bg-transparent h-full">
          <Text></Text>
        </View>
      </TouchableWithoutFeedback>
      <View className="flex justify-start rounded-tl-3xl rounded-tr-3xl shadow-2xl shadow-gray-800 items-start px-8 absolute h-36 bottom-0 bg-white w-full">
        <View className="bg-gray-200 w-full rounded-lg py-4 px-4 mt-4">
          <TouchableOpacity onPress={() => handleDelete()}>
            <Text className="text-red-600 font-bold text-lg mb-2">Delete</Text>
          </TouchableOpacity>
          <View className="w-full h-[1px] bg-gray-300"></View>
          <TouchableOpacity onPress={() => setVisivleModal(false)}>
            <Text className="text-black font-bold text-lg mb-2">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ActionDeleteSheet;
