/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, Image, Dimensions, StatusBar, Platform, StyleSheet, Text, View, Linking} from 'react-native';

import Splash from './Splash'
import Header from './Header'

import Icon from 'react-native-ionicons'
import firebase from 'react-native-firebase';
const {height, width} = Dimensions.get('window');

export default class Categories extends Component {

    constructor(props){
        super(props);

        this.state = {
            showSplash: true,
            subCategories: [],
            city: '',
            category: {}
        }

    }

    componentWillMount(){

        this.setState({city: this.props.navigation.getParam('city', 'Ups!')})
        this.setState({category: this.props.navigation.getParam('category', {})}, () => {
            firebase.firestore().collection('categorias').doc(this.state.category.id)
            .collection('subcategorias').orderBy('nombre').onSnapshot((snapshot) => {
                let subCategories = [];
                snapshot.forEach(doc => {
                    subCategories.push(doc.data());
                })
                this.setState({subCategories})
            });
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

                        <View style = {{paddingHorizontal: 5}}><Icon name="arrow-dropright" size = {20} color = {'#260a81'}/></View>

                        <Text style = {styles.cityNameText}>
                            {this.state.category.nombre}
                        </Text>
                        
                    </View>

                    <View style = {styles.title}>
                        <Text style = {styles.titleText}>
                            Subcategorías
                        </Text>
                    </View>

                    <ScrollView style = {{alignSelf: 'stretch'}}>
                        {this.state.subCategories.map((category, map) => {
                            return(
                                <TouchableOpacity style = {styles.category} onPress = {() => {
                                    this.props.navigation.navigate('Coupons', {city: this.state.city, category: this.state.category, subCategory: category})
                                }}>

                                    <View style = {styles.circle}/>

                                    <Text style = {styles.categoryText}>
                                        {category.nombre}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    <TouchableOpacity style = {styles.privacy}onPress = {() => {
                        Linking.openURL('https://gangazos.herokuapp.com/politicas').catch((err) => console.error('An error occurred', err));
                    }}>
                        <Text style = {styles.privacyText}>
                            Politicas de privacidad
                        </Text>
                    </TouchableOpacity>

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
    padding: 10,
    flexDirection: 'row'
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
},

privacy: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20
  },

  privacyText: {
    fontSize: 10
  },

});
