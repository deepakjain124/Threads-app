import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Heart from 'react-native-vector-icons/Feather';
import Message from 'react-native-vector-icons/Feather';
import Share from 'react-native-vector-icons/Octicons';
import Threads from 'react-native-vector-icons/FontAwesome6';
import OptionModal from './OptionModal';
import { getMkvData } from '../../src/Storage/StorageFun';
import { Images } from '../../src/Controller';

const Home = () => {
  const [color, setColor] = useState('black'); // Initial color state
  const [bounceValue] = useState(new Animated.Value(1));
const [visblemodal,setVisivleModal]=useState(false)
const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}, []);
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
    setColor(color==="red"?"black":"red");

  };
  const animatedStyle = {
    transform: [{scale: bounceValue}],
  };
  return (
    <>
      <View className="flex-row justify-center my-4 items-center">
        <Threads name="threads" size={40} color="black" />
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map((i, index) => {
          return (
            <View key={index}>
              <View className="mt-4">
                <View className="flex-row justify-between mx-3 items-start">
                  <View className="flex-row justify-between items-start gap-4">
                    <View className="relative">
                      <Image className="w-12 h-12 rounded-full" source={!getMkvData("userDetails")?.Image?Images.DefaultImage:{uri:getMkvData("userDetails")?.Image}} />
                    </View>
                    <View>
                      <Text className="text-black font-bold text-lg">
                        Deepak Jain
                      </Text>
                      <Text className="text-black">
                        Winter season style nice one look
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-2 justify-between items-center">
                    <Text className="text-black">11h</Text>
                    <TouchableOpacity onPress={()=>setVisivleModal(true)}>
                      <Icon
                        name="dots-three-horizontal"
                        size={20}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View className="flex-col ml-16 mt-2 mr-4 justify-center items-start">
                <Image
                  className="w-full h-80 rounded-lg"
                  source={Images.Photo}
                />
                <View className="flex-row my-4 justify-start gap-x-5  w-full items-center">
                  <TouchableOpacity onPress={handlePress}>
                    <Animated.View style={[ animatedStyle]}>
                      <Icon name="heart" size={25} color={color} />
                    </Animated.View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Message name="message-circle" size={25} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Heart name="heart" size={25} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <OptionModal visblemodal={visblemodal} setVisivleModal={setVisivleModal}/>
    </>
  );
};

export default Home;
