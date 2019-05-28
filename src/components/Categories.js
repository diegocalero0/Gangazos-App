/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, Image, Dimensions, StatusBar, Platform, StyleSheet, Text, View, FlatList} from 'react-native';

import Splash from './Splash'
import Header from './Header'

import firebase from 'react-native-firebase';
const {height, width} = Dimensions.get('window');

export default class Categories extends Component {

    constructor(props){
        super(props);

        this.state = {
            showSplash: true,
            categories: [],
            city: ''
        }

    }

    componentWillMount(){

        this.setState({city: this.props.navigation.getParam('city', 'Ups!')})

        firebase.firestore().collection('categorias').orderBy('nombre').onSnapshot((snapshot) => {
            let categories = [];
            snapshot.forEach(doc => {
                let category = doc.data();
                category.id = doc.id;
                categories.push(doc.data());
            })
            this.setState({categories})
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#260a81" barStyle="light-content" />
                <Header navigation = {this.props.navigation}/>


                <View style = {styles.categoriesContainer}>

                    <View style = {styles.cityName}>
                        <Text style = {styles.cityNameText}>
                            {this.state.city.nombre}
                        </Text>
                    </View>

                    <View style = {styles.title}>
                        <Text style = {styles.titleText}>
                            Categorías
                        </Text>
                    </View>

                    <ScrollView style = {{alignSelf: 'stretch'}}>
                        {this.state.categories.map((category, map) => {
                            return(
                                <TouchableOpacity style = {styles.category} onPress = {() => {
                                    this.props.navigation.navigate('SubCategories', {city: this.state.city, category: category})
                                }}>

                                    <View style = {styles.circle}/>

                                    <Text style = {styles.categoryText}>
                                        {category.nombre}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#260a81',
  },

  cityName: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  cityNameText: {
    color: '#260a81',
    fontSize: 15
  },

  title: {
    padding: 5,
    backgroundColor: '#260a81',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    color: 'white',
    fontSize: 20
  },

  category: {
      padding: 10,
      paddingLeft: 20,
      backgroundColor: '#f7c00b',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 0.5,
      flexDirection: 'row'
  },

  categoryText: {
    color: '#260a81',
    fontSize: 20
  },

  flatlist: {
      alignSelf: 'stretch',
      backgroundColor:'#260a81',
      flex: 3
  },

  categoriesContainer: {
      flex: 7,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#f7c00b'
  },

  circle: {
    width: 20,
    height: 20,
    backgroundColor: '#260a81',
    marginRight: 10,
    borderRadius: 25
}

});
