import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../Controller';

const SearchScrren = () => {
  const [followed, setFollowd] = useState([]);
  const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, index) => {
    return {
      id: i,
      followed: false,
    };
  });
  const handleFollow = id => {
    let check = followed.includes(id);
    let newData = [...followed];
    if (check) {
      newData = newData.filter(i => i !== id);
      setFollowd(newData);
    } else {
      newData = [...newData, id];
      setFollowd(newData);
    }
  };
  return (
    <View>
      <View className="m-4 h-full">
        <Text className="text-black font-bold text-2xl">Search</Text>
        <TextInput
          className="bg-gray-200 rounded-xl text-lg text-black px-4 mt-4"
          placeholderTextColor={'gray'}
          placeholder="Search"></TextInput>
        <ScrollView>
          {Array.map((i, index) => (
            <View key={index} className="mt-4 mx-2">
              <View className="flex-row justify-between items-center ">
                <View className="flex-row justify-start items-start gap-2">
                  <Image
                    source={Images.Photo}
                    className="rounded-full w-12 h-12 "
                  />
                  <View>
                    <Text className="text-black font-bold">
                      Yatin_Bharadwaj123
                    </Text>
                    <Text className="text-gray-500 mt-2">Yatin Bharadwaj</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleFollow(i.id)}>
                  <View
                    className={`border ${
                      followed.includes(i.id) ? 'bg-black' : 'bg-transparent'
                    } border-gray-300 px-2 flex justify-center items-center w-28 py-2 rounded-md`}>
                    <Text
                      className={`${
                        followed.includes(i.id) ? 'text-white' : 'text-black'
                      } font-bold`}>
                      {!followed.includes(i.id) ? 'Follow' : 'Follwoing'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchScrren;
