import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Custominput from '../Component/Custominput';
import Colors from '../Constant/Colors';
import CustomButton from '../Component/Custombutton';
import { useNavigation } from '@react-navigation/native';
import { storeUser } from '../../utils/storage';
import { showMessage } from 'react-native-flash-message';
const SignUp = () => {
  const navigation =useNavigation()
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric').min(10, 'Phone number must be at least 10 digits').required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  const handleSignup = async (values) => {
    await storeUser(values);
    showMessage({
      message: 'Registration Successful',
      type: 'success',
    });
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Signup</Text>
        <Formik
          initialValues={{ email: '', phone: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Custominput
                PlaceHolder="Your Email"
                icons={require('../../assets/mail.png')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.validation}>{errors.email}</Text>
              )}
              <Custominput
                PlaceHolder="Your Phone Number"
                icons={require('../../assets/phone-call.png')}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={touched.phone && errors.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.validation}>{errors.phone}</Text>
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
              <CustomButton title={'Signup'} bgColor={'blue'} onPress={handleSubmit}/>
              <Text style={[styles.text,{fontSize:14,marginTop:20,color:"#757575"}]
            }
            onPress={()=>navigation.navigate('Login')}>Already have a account ? Login</Text>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: "30%",
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  validation: {
    fontSize: 12,
    color: 'red',
  },
});
