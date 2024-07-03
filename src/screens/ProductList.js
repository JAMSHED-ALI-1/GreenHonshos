import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import CustomHeader from '../Component/Header';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/feature/counterSlice';

const data = [
    { id: 1, name: 'T-shirts' },
    { id: 2, name: 'CropTop' },
    { id: 3, name: 'Blouses' },
    { id: 4, name: 'Shirts' },
    { id: 5, name: 'Pants' }
];

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Initially set to true
    const [count, setCount] = useState(0);
    const apiUrl = 'https://stgpim.getketch.com/pim/pimresponse.php/?service=category&store=1&url_key=mens-fashion%2Fshirts%2Fcasual-shirts&page=1&count=50&sort_by=&sort_dir=desc&filter=';
    const counter = useSelector((state) => state.counter.value)
  
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            // setLoading(false)
            try {
                const response = await axios.get(apiUrl);
                setProducts(response.data.result.products);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
    
        fetchProducts();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => dispatch(increment())}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                    <Text key={i} style={styles.star}>
                        {i < item.rating ? '★' : '☆'}
                    </Text>
                ))}
            </View>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{`₹ ${item.price}`}</Text>
            <TouchableOpacity style={styles.Heartcontainer}>
                <Image source={require('../../assets/heart.png')} style={{ height: 17, width: 17 }} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 15, marginTop: 35 }}>
            <CustomHeader back={true} left={true} right={true} title={'Products'} count={count} />
            <ScrollView horizontal style={styles.categoryContainer} contentContainerStyle={styles.categoryContent} showsHorizontalScrollIndicator={false}>
                {data.map((category) => (
                    <TouchableOpacity key={category.id} style={styles.categoryBox}>
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterOption}>
                    <Image source={require('../../assets/sort.png')} style={styles.filterIcon} />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                    <Image source={require('../../assets/up-down.png')} style={styles.filterIcon} />
                    <Text style={styles.filterText}>Price Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                    <Image source={require('../../assets/grid.png')} style={styles.filterIcon} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingHorizontal: 10,
    },
    item: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    image: {
        width: 150,
        height: 130,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'stretch'
    },
    brand: {
        fontWeight: '500',
        fontSize: 12,
        paddingHorizontal: 6,
    },
    title: {
        fontSize: 13,
        marginVertical: 5,
        fontWeight: "bold",
        paddingHorizontal: 6,
    },
    price: {
        fontWeight: 'bold',
        padding: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    star: {
        color: 'gold',
        marginHorizontal: 2,
    },
    categoryContainer: {
        marginVertical: 10,
        maxHeight: 50,
    },
    categoryContent: {
        alignItems: 'center',
    },
    categoryBox: {
        backgroundColor: 'black',
        paddingHorizontal: 30,
        borderRadius: 5,
        marginRight: 10,
        height: 40,
        justifyContent: 'center',
        borderRadius: 80,
        marginBottom: 10,
        marginTop: 12
    },
    categoryText: {
        color: 'white',
        fontWeight: 'bold',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 15
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    filterIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    filterText: {
        fontWeight: '500',
        fontSize: 13,
        color: 'black',
    },
    Heartcontainer: {
        height: 30, width: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        position: 'absolute',
        right: 5,
        top: "50%",
        elevation: 3,
    }
});

export default ProductList;
