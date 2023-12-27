import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import Cross from 'react-native-vector-icons/Entypo';
import Check from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import {useNavigation} from '@react-navigation/native';
import Camera from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/Feather';
import Family from 'react-native-vector-icons/MaterialIcons';
import Comapny from 'react-native-vector-icons/FontAwesome';
import Call from 'react-native-vector-icons/Ionicons';
import DropDown from 'react-native-vector-icons/FontAwesome';
import Home from 'react-native-vector-icons/AntDesign';
import Location from 'react-native-vector-icons/EvilIcons';
import Message from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CONTACT_ADDRESS_LABELS,
  CONTACT_EMAIL_LABELS,
  CONTACT_IM_LABELS,
  CONTACT_PHONE_LABELS,
} from '../../src/Constants/ContactContstant';
import {openImagePicker} from '../../src/Controller/CameraFun';
import {ActivityIndicator} from 'react-native';
const ContactForm = ({route}) => {
  const {data} = route.params || {};
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState([{label: 'home', number: ''}]);
  const [email, setEmail] = useState([{label: 'home', email: ''}]);
  const [showLoader, setShowLoader] = useState(false);
  const [im, setIm] = useState([{username: '', service: 'Facebook'}]);
  const [address, setAddress] = useState([
    {
      label: 'home',
      formattedAddress: '',
      street: '',
      pobox: '',
      neighborhood: '',
      city: '',
      region: '',
      state: '',
      postCode: '',
      country: '',
    },
  ]);
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to add  contacts.',
      buttonPositive: 'Please accept bare mortal',
    });
    if (route.params) {
      setGivenName(data.givenName);
      setMiddleName(data?.middleName);
      setFamilyName(data?.familyName);
      setJobTitle(data?.jobTitle);
      setCompanyName(data?.company);
      setthumbNailPath(data?.thumbnailPath);
      setPhoneNumber(
        data?.phoneNumbers.length !== 0
          ? data?.phoneNumbers
          : [{label: 'home', number: ''}],
      );
      setEmail(
        data?.emailAddresses.length !== 0
          ? data?.emailAddresses
          : [{label: 'home', email: ''}],
      );
      setIm(
        data?.imAddresses.length !== 0
          ? data?.imAddresses
          : [{username: '', service: 'Facebook'}],
      );
      setAddress(
        data?.postalAddresses.length !== 0
          ? data?.postalAddresses
          : [
              {
                label: 'home',
                formattedAddress: '',
                street: '',
                pobox: '',
                neighborhood: '',
                city: '',
                region: '',
                state: '',
                postCode: '',
                country: '',
              },
            ],
      );
    }
  }, []);
  const [givenName, setGivenName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [thumbnailPath, setthumbNailPath] = useState('');
  const ContactDocumentTemplate = {
    backTitle: '',
    prefix: '',
    givenName: givenName,
    middleName: middleName,
    familyName: familyName,
    suffix: '',
    phoneNumbers: phoneNumber,
    jobTitle: jobTitle,
    company: companyName,
    department: '',
    emailAddresses: email,
    postalAddresses: address,
    // birthday: {year: 1988, month: 1, day: 1},
    imAddresses: im,
    isStarred: false,
    isBlocked: false,
    hasThumbnail: true,
    thumbnailPath: thumbnailPath,
    tags: [],
  };
  const handleSave = () => {
    if (!givenName) {
      Alert.alert('Enter Name');
    }
    if (!route.params) {
      setShowLoader(true);

      Contacts.addContact(ContactDocumentTemplate)
        .then(res => {
          setShowLoader(false);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setShowLoader(false);
          navigation.navigate('Contacts', {
            update: true,
          });
        });
    } else {
      setShowLoader(true);
      let temp = {
        ...ContactDocumentTemplate,
        ['recordID']: data.recordID,
        ['rawContactId']: data.rawContactId,
      };
      Contacts.updateContact(temp)
        .then(res => {
          setShowLoader(false);
        })
        .catch(err => console.log({err}))
        .finally(() => {
          setShowLoader(false);
          navigation.navigate('Contacts', {
            update: true,
          });
        });
    }
  };
  const handleAddNumber = () => {
    setPhoneNumber([...phoneNumber, {label: 'Home', number: ''}]);
  };
  return (
    <ScrollView>
      <View className="mx-4 mt-2">
        <View className=" flex flex-row justify-between  items-center">
          <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
            <Cross name="cross" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-lg font-bold">Add Contact</Text>
          {showLoader ? (
            <ActivityIndicator size={25} color={'black'} />
          ) : (
            <TouchableOpacity onPress={handleSave}>
              <Check name="check" size={25} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View className="flex flex-row justify-center items-center mt-8">
          {thumbnailPath === '' ? (
            <TouchableOpacity onPress={() => openImagePicker(setthumbNailPath)}>
              <View className="bg-blue-200 p-10 rounded-full">
                <Camera name="camerao" size={30} color="black" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => openImagePicker(setthumbNailPath)}>
              <View className="bg-blue-200  rounded-full">
                <Image
                  source={{uri: thumbnailPath}}
                  className="w-28 rounded-full h-28"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView keyboardDismissMode="interactive">
          <View className="w-full mt-2 flex flex-row justify-center items-end">
            <View className="w-[15%] ">
              <User name="user" size={20} color="black" />
            </View>
            <View className="w-[85%] ">
              <TextInput
                placeholder="Name"
                value={givenName}
                onChangeText={v => setGivenName(v)}
                placeholderTextColor={'gray'}
                className="border-b text-black border-black"
              />
            </View>
          </View>
          <View className="w-full mt-2 flex flex-row justify-center items-end">
            <View className="w-[15%] ">
              <User name="user" size={20} color="black" />
            </View>
            <View className="w-[85%] ">
              <TextInput
                placeholder="MiddleName"
                value={middleName}
                onChangeText={v => setMiddleName(v)}
                placeholderTextColor={'gray'}
                className="border-b text-black border-black"
              />
            </View>
          </View>
          <View className="w-full mt-2 flex flex-row justify-center items-end">
            <View className="w-[15%] ">
              <Family name="family-restroom" size={20} color="black" />
            </View>
            <View className="w-[85%] ">
              <TextInput
                placeholder="FamilyName"
                value={familyName}
                onChangeText={v => setFamilyName(v)}
                placeholderTextColor={'gray'}
                className="border-b text-black border-black"
              />
            </View>
          </View>
          <View className="w-full mt-2 flex flex-row justify-center items-end">
            <View className="w-[15%] ">
              <Comapny name="building-o" size={20} color="black" />
            </View>
            <View className="w-[85%] ">
              <TextInput
                placeholder="Company"
                value={companyName}
                onChangeText={v => setCompanyName(v)}
                placeholderTextColor={'gray'}
                className="border-b text-black border-black"
              />
            </View>
          </View>
          <View className="w-full mt-2 flex flex-row justify-center items-end">
            <View className="w-[15%] ">
              <Text></Text>
            </View>
            <View className="w-[85%] ">
              <TextInput
                placeholder="Job title"
                value={jobTitle}
                onChangeText={v => setJobTitle(v)}
                placeholderTextColor={'gray'}
                className="border-b text-black border-black"
              />
            </View>
          </View>
          <View className="w-full  mt-2 flex flex-row justify-center  items-start">
            <View className="w-[10%]  flex-1 mt-4">
              <Call name="call-outline" color="black" size={20} />
            </View>
            <View className="w-[90%]">
              {phoneNumber?.map((i, index) => {
                return (
                  <View
                    key={index}
                    className=" flex  flex-row justify-around items-center">
                    <View className=" ">
                      <SelectDropdown
                        defaultValue={i.label}
                        buttonStyle={{
                          width: 80,
                          padding: 0,
                          margin: 0,
                          backgroundColor: 'transparent',
                          borderRadius: 15,
                          height: 35,
                        }}
                        data={CONTACT_PHONE_LABELS.map(i => {
                          return i.label;
                        })}
                        rowTextStyle={{fontSize: 13}}
                        dropdownStyle={{
                          backgroundColor: 'lightgray',
                          borderRadius: 10,
                          width: 100,
                        }}
                        buttonTextStyle={{fontSize: 10, margin: 0, padding: 0}}
                        onSelect={(selectedItem, indexx) => {
                          let temp = [...phoneNumber];
                          temp[index] = {...temp[index], label: selectedItem};
                          setPhoneNumber(temp);
                        }}
                        renderDropdownIcon={() => (
                          <DropDown
                            name="chevron-down"
                            color="black"
                            size={10}
                          />
                        )}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                      />
                    </View>
                    <View className="w-[180px] ">
                      <TextInput
                        value={i.number}
                        onChangeText={v => {
                          let temp = [...phoneNumber];
                          temp[index] = {...temp[index], number: v};
                          setPhoneNumber(temp);
                        }}
                        placeholder="Number"
                        placeholderTextColor={'gray'}
                        className="border-b w-full border-black text-black"
                      />
                    </View>
                    {index < phoneNumber.length &&
                    index !== phoneNumber.length - 1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          let temp = [...phoneNumber];
                          setPhoneNumber(
                            temp.filter((i, indexx) => indexx !== index),
                          );
                        }}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          x
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => handleAddNumber()}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          +
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
          <View className="w-full mt-2 flex flex-row justify-center  items-center">
            <View className="w-[10%] ">
              <Home name="mail" color="black" size={20} />
            </View>
            <View className="w-[90%]">
              {email?.map((i, index) => {
                return (
                  <View
                    key={index}
                    className=" flex  flex-row justify-around items-center">
                    <View className=" ">
                      <SelectDropdown
                        defaultValue={i.label}
                        buttonStyle={{
                          width: 80,
                          padding: 0,
                          margin: 0,
                          backgroundColor: 'transparent',
                          borderRadius: 15,
                          height: 35,
                        }}
                        data={CONTACT_EMAIL_LABELS.map(i => {
                          return i.label;
                        })}
                        rowTextStyle={{fontSize: 13}}
                        dropdownStyle={{
                          backgroundColor: 'lightgray',
                          borderRadius: 10,
                          width: 100,
                        }}
                        buttonTextStyle={{fontSize: 10, margin: 0, padding: 0}}
                        onSelect={(selectedItem, indexx) => {
                          let temp = [...email];
                          temp[index] = {...temp[index], label: selectedItem};
                          setEmail(temp);
                        }}
                        renderDropdownIcon={() => (
                          <DropDown
                            name="chevron-down"
                            color="black"
                            size={10}
                          />
                        )}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                      />
                    </View>
                    <View className="w-[180px] ">
                      <TextInput
                        value={i.email}
                        onChangeText={v => {
                          let temp = [...email];
                          temp[index] = {...temp[index], email: v};
                          setEmail(temp);
                        }}
                        placeholder="Email"
                        placeholderTextColor={'gray'}
                        className="border-b w-full border-black text-black"
                      />
                    </View>
                    {index < email.length && index !== email.length - 1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          let temp = [...email];
                          setEmail(
                            temp.filter((i, indexx) => indexx !== index),
                          );
                        }}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          x
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setEmail([...email, {label: 'Home', email: ''}]);
                        }}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          +
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
          <View className="w-full mt-2 flex flex-row justify-center  items-center">
            <View className="w-[10%] ">
              <Location name="location" color="black" size={20} />
            </View>
            <View className="w-[90%]">
              {address?.map((i, index) => {
                return (
                  <View
                    key={index}
                    className=" flex  flex-row justify-around items-center">
                    <View className=" ">
                      <SelectDropdown
                        defaultValue={i.label}
                        buttonStyle={{
                          width: 80,
                          padding: 0,
                          margin: 0,
                          backgroundColor: 'transparent',
                          borderRadius: 15,
                          height: 35,
                        }}
                        data={CONTACT_ADDRESS_LABELS.map(i => {
                          return i.label;
                        })}
                        rowTextStyle={{fontSize: 13}}
                        dropdownStyle={{
                          backgroundColor: 'lightgray',
                          borderRadius: 10,
                          width: 100,
                        }}
                        buttonTextStyle={{fontSize: 10, margin: 0, padding: 0}}
                        onSelect={(selectedItem, indexx) => {
                          let temp = [...address];
                          temp[index] = {...temp[index], label: selectedItem};
                          setAddress(temp);
                        }}
                        renderDropdownIcon={() => (
                          <DropDown
                            name="chevron-down"
                            color="black"
                            size={10}
                          />
                        )}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                      />
                    </View>
                    <View className="w-[180px] ">
                      <TextInput
                        value={i.formattedAddress}
                        onChangeText={v => {
                          let temp = [...address];
                          temp[index] = {...temp[index], formattedAddress: v};
                          setAddress(temp);
                        }}
                        placeholder="Address"
                        placeholderTextColor={'gray'}
                        className="border-b w-full border-black text-black"
                      />
                    </View>
                    {index < address.length && index !== address.length - 1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          let temp = [...address];
                          setAddress(
                            temp.filter((i, indexx) => indexx !== index),
                          );
                        }}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          x
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setAddress([
                            ...address,
                            {
                              label: 'Home',
                              formattedAddress: '',
                              street: '',
                              pobox: '',
                              neighborhood: '',
                              city: '',
                              region: '',
                              state: '',
                              postCode: '',
                              country: '',
                            },
                          ]);
                        }}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          +
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
          <View className="w-full mt-2 flex flex-row justify-center  items-center">
            <View className="w-[10%] ">
              <Message
                name="message-processing-outline"
                color="black"
                size={20}
              />
            </View>
            <View className="w-[90%]">
              {im?.map((i, index) => {
                return (
                  <View
                    key={index}
                    className=" flex  flex-row justify-around items-center">
                    <View className=" ">
                      <SelectDropdown
                        defaultValue={i.service}
                        buttonStyle={{
                          width: 80,
                          padding: 0,
                          margin: 0,
                          backgroundColor: 'transparent',
                          borderRadius: 15,
                          height: 35,
                        }}
                        data={CONTACT_IM_LABELS.map(i => {
                          return i.label;
                        })}
                        rowTextStyle={{fontSize: 13}}
                        dropdownStyle={{
                          backgroundColor: 'lightgray',
                          borderRadius: 10,
                          width: 100,
                        }}
                        buttonTextStyle={{fontSize: 10, margin: 0, padding: 0}}
                        onSelect={(selectedItem, indexx) => {
                          let temp = [...im];
                          temp[index] = {...temp[index], service: selectedItem};
                          setIm(temp);
                        }}
                        renderDropdownIcon={() => (
                          <DropDown
                            name="chevron-down"
                            color="black"
                            size={10}
                          />
                        )}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                      />
                    </View>
                    <View className="w-[180px] ">
                      <TextInput
                        value={i.username}
                        onChangeText={v => {
                          let temp = [...im];
                          temp[index] = {...temp[index], username: v};
                          setIm(temp);
                        }}
                        placeholder="IM"
                        placeholderTextColor={'gray'}
                        className="border-b w-full border-black text-black"
                      />
                    </View>
                    {index < im.length && index !== im.length - 1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          let temp = [...im];
                          setIm(temp.filter((i, indexx) => indexx !== index));
                        }}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          x
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setIm([...im, {username: '', service: 'Facebook'}]);
                        }}>
                        <Text className="bg-purple-500  text-white rounded-full px-2 py-1 flex-row justify-center items-center flex m-auto ">
                          +
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ContactForm;
