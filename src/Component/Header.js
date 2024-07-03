import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity,count } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CustomHeader = ({ title, left, right,back,OnPress,textcolor,bgColor,grid }) => {
  const counter = useSelector((state) => state.counter.value)
 console.log(counter)
  
  const dispatch = useDispatch()
  return (
    <View style={[styles.container,]}>
      <View style={styles.leftContainer}>
      {left && (
          <TouchableOpacity style={[styles.iconContainer,]}  onPress={OnPress}>
            <Image source={require('../../assets/left.png')} style={{height:25,width:25}} tintColor={'black'} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerContainer}>
        {title &&
       <Text style={[styles.text, { color: 'black' }]}>{title}</Text>
        }
      </View>

      <View style={styles.rightContainer}>
        {right &&
          <View style={styles.iconContainer}>
           
            <TouchableOpacity style={styles.iconContainer}>

             <Image source={require('../../assets/shopping-cart.png')} style={[styles.icon,]}  tintColor={'black'}/>
            </TouchableOpacity>
            <Text>{counter}</Text>
          </View>
        }
      </View>
    </View>
  )
}

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   marginBottom:10
  },
  text: {
    fontSize: 20,
    color:"black",
    fontWeight:'600'
  },
  iconContainer: {
    width: Width * 0.06,
    height: Height * 0.038,
    justifyContent: 'center',
    flexDirection:'row',
   
  },
  icon: {
    width: '120%',
    height: '100%',
    resizeMode: 'contain',
  },
  leftContainer: {
    flex: 1, 
    alignItems: 'flex-start',
  },
  centerContainer: {
    // flex: 1, 
    // alignItems: 'center', 
  },
  rightContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
  },
});




