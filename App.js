import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductList from './src/screens/ProductList';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


export default function App() {
  return (

    <>
      <StatusBar backgroundColor='white' />
      <Provider store={store}>
        <ProductList />
      </Provider>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

