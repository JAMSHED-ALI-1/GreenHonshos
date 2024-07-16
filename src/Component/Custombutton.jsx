import { StyleSheet, Text, TouchableOpacity,View,Image,ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from '../Constant/Colors';
// import { COLORS, Font } from '../../Theme/Colors';


const CustomButton = ({ title, onPress, bgColor, textColor ,borderColor,isLoading}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, { backgroundColor: bgColor ,borderColor:borderColor}]}
      onPress={onPress}
    >
      <Text style={[styles.textStyle, { color: textColor || Colors.white }]}>{title}</Text>
      {isLoading && <ActivityIndicator size="small" color={'white'} />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 5,
    height:50,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  
  },
});
