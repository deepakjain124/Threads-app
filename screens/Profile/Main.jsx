import {View, Text, Image, TouchableOpacity, ScrollView, BackHandler} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Images} from '../../Controller';
import ProfileTab from './ProfileTab';
import { getMkvData } from '../../Storage/StorageFun';

const Main = () => {
    const[openEditProfile,setOpenEditProfile]=useState(false)
  return (
   <>
   <ScrollView>
   <View className="mx-4">
      <View className="flex-row justify-between mt-6 items-end">
        <View>
          <Text className="text-black text-3xl">{getMkvData("userDetails").userName}</Text>
          <Text className="text-black text-sm">_beingdeepakjain_</Text>
        </View>
        <TouchableOpacity >
        <Image  source={!getMkvData("userDetails")?.Image?Images.DefaultImage:{uri:getMkvData("userDetails")?.Image}} className="w-20 rounded-full h-20" />
        </TouchableOpacity>
      </View>
      <View className="mt-4">
        <Text className="text-black text-sm font-semibold">
          {getMkvData("userDetails").Bio}
        </Text>
      </View>
      <View className="flex-row justify- mt-3 items-center">
        <View className="relative w-14 ">
          <Image source={Images.Photo} className="w-8 z- rounded-full h-8" />
          <Image
            source={Images.Photo}
            style={{borderColor: 'black', borderLeftWidth: 4}}
            className="w-8 absolute left-4 rounded-full  h-8"
          />
        </View>
        <Text className="text-gray-500 text-sm">33 Followers</Text>
      </View>
      <View className="flex-row justify-between mt-4 items-center">
        <TouchableOpacity onPress={()=>setOpenEditProfile(true)}>
          <View className="border border-gray-500 px-10 py-2 rounded-lg">
            <Text className="text-black font-semibold">Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="border border-gray-500 px-10 py-2 rounded-lg">
            <Text className="text-black font-semibold">Share Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
      <ProfileTab openEditProfile={openEditProfile} setOpenEditProfile={setOpenEditProfile}/>
   </ScrollView>
   </>
  );
};

export default Main;
