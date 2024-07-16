import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Custominput from '../Component/Custominput';
import Colors from '../Constant/Colors';
import CustomButton from '../Component/Custombutton';
import { useNavigation } from '@react-navigation/native';
import {  getUser } from '../../utils/storage';
import { showMessage } from 'react-native-flash-message';
const Login = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  const handleLogin = async (values) => {
    const storedUser = await getUser();
    if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
      showMessage({
        message: 'Login Successful',
        type: 'success',
      });
      navigation.navigate('BottomTab');
    } else {
      showMessage({
        message: 'Invalid credentials',
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        {/* <Text style={styles.text}>Login to your account</Text> */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Custominput
                PlaceHolder="Your Email"
                icons={require('../../assets/mail.png')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={ errors.email}
                touched={touched.email}
              />
               {touched.email && errors.email && (
                <Text style={styles.validation}>{errors.email}</Text>
              )}
              <Custominput
                PlaceHolder="Your Password"
                icons={require('../../assets/padlock.png')}
                secure={true}
                LockIcon={true}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
              />
             {touched.password && errors.password && (
                <Text style={styles.validation}>{errors.password}</Text>
              )}
              <CustomButton title={'Login'}  bgColor={'blue'} onPress={handleSubmit}/>
              <Text style={[styles.text,{fontSize:14,marginTop:20,color:"#757575"}]
            }
            onPress={()=>navigation.navigate('SignUp')}>Don't have a account ? Signup</Text>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
    marginTop:"30%"
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  validation:{
    fontSize:12,
    color:'red'
  }
});
