import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../Constant/Colors';


const Custominput = ({ PlaceHolder, icons, secure, phone, value, onChangeText, onBlur, error, touched, LockIcon }) => {
  const [showEye, setShowEye] = React.useState(false);

  const handleEye = () => {
    setShowEye(!showEye);
  };

  return (
    <View
      style={{
    
        backgroundColor: Colors.white,
        height: 50,
        borderColor: error && touched ? Colors.red : Colors.placeHolderTextColor,
        borderWidth: 1,
         paddingLeft: 10,
        borderRadius: 8,
        marginTop: 20,
      }}
    >
      <TextInput
        placeholder={PlaceHolder}
        keyboardType={phone ? 'phone-pad' : 'default'}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        secureTextEntry={secure && !showEye}
        placeholderTextColor={Colors.gray}
        style={{
          left: icons ? 30 : 0,
           height:50,
        }}
      />

      <Image source={icons} style={styles.iconStyle} tintColor={Colors.secondry} />
      {LockIcon ? (
        <Ionicons
          name={showEye ? 'eye' : 'eye-off'}
          size={20}
          style={[styles.iconStyle1,]}
          color={Colors.faint}
          onPress={handleEye}
        />
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    top: 13,
    width: 20,
    height: 20,
    left: 10,
  },
  iconStyle1: {
    position: 'absolute',
    right: 10,
    top: 13,
    width: 20,
    height: 20,
  },
});

export default Custominput

