import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import { ScrollView } from 'react-native';
import { Images } from '../../Controller';

const Likes = () => {
  const [selected, setSelected] = useState('1');
  const data = [
    {key: '1', text: 'All'},
    {key: '2', text: 'Replay'},
    {key: '3', text: 'Mentions'},
    {key: '4', text: 'Verified'},
    // Add more items as needed
  ];
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
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setSelected(item.key)}>
        <View
          className={`border mt-4 border-gray-300 ${
            selected === item.key ? 'bg-black' : 'bg-transparent'
          } h-8 flex justify-center items-center w-20 mr-5 rounded-lg`}>
          <Text
            className={`${
              selected === item.key ? 'text-white' : 'text-black'
            } font-bold`}>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View className="m-4 h-full">
        <Text className="text-black font-bold text-2xl">Activity</Text>
        <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          horizontal={true} // Set the horizontal prop to true for horizontal scrolling
        />
        </View>
         <ScrollView className='mt-5'>
          {Array.map((i, index) => (
            <View key={index} className="mt-4 mx-1">
              <View className="flex-row justify-between items-center ">
                <View className="flex-row justify-start items-start gap-2">
                  <Image
                    source={Images.Photo}
                    className="rounded-full w-10 h-10 "
                  />
                  <View>
                    <Text className="text-black font-bold">
                      Yatin_Bharad123 <Text className='text-gray-500 text-xs'>
                      9W
                      </Text>
                    </Text>
                    <Text className="text-gray-500 mt-2">Started following you</Text>
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

export default Likes;
