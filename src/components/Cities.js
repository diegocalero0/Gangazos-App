/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, ImageBackground, Dimensions, StatusBar, Platform, StyleSheet, Text, View, FlatList, Linking} from 'react-native';

import Splash from './Splash'
import Header from './Header'

import firebase from 'react-native-firebase';
import Icon from 'react-native-ionicons'


const {height, width} = Dimensions.get('window');

export default class Cities extends Component {

    constructor(props){
        super(props);

        this.state = {
            showSplash: true,
            coupons: [],
            cities: []
        }

    }

    componentWillMount(){

        firebase.firestore().collection('cupones').where('destacado', '==', true)
        .onSnapshot((snapshot) => {
            let coupons = [];
            snapshot.forEach(doc => {
                let coupon = doc.data()
                coupon.id = doc.id;

                let inicio = new Date(coupon.inicio.seconds * 1000);
                let fin = new Date(coupon.fin.seconds * 1000);

                if(new Date() >= inicio && new Date() <= fin){
                    coupons.push(coupon);
                }
            })
            this.setState({coupons})
        });

        firebase.firestore().collection('ciudades').orderBy('nombre').onSnapshot((snapshot) => {
            let cities = [];
            snapshot.forEach(doc => {
                cities.push(doc.data());
            })
            this.setState({cities})
        });
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({showSplash: false})
        }, 1500)
    }

    renderCoupon(coupon, index){
        return(
            <TouchableOpacity style = {styles.coupon} onPress = {() => {
                this.props.navigation.navigate('Coupon', {coupon: coupon})
            }}>
                <ImageBackground
                resizeMode = {'cover'}
                style={{width: width, height: 576 * width / 1024, alignItems: 'center', justifyContent: 'flex-end'}}
                source={{uri: coupon.imagen}}
                >
                    
                </ImageBackground>



                <View style = {styles.indicator}>

                    <View style = {{flex: 1, alignItems: 'flex-end', marginRight: 2}}>
                        <Icon name="arrow-dropleft" size = {10} color = {'#260a81'}/>
                    </View>

                    <Text style = {styles.indicatorText}>
                        {index + 1 + ' de ' + this.state.coupons.length}
                    </Text>

                    <View style = {{flex: 1, alignItems: 'flex-start', marginLeft: 2}}>
                        <Icon name="arrow-dropright" size = {10} color = {'#260a81'}/>
                    </View>

                </View>   

            </TouchableOpacity>
        )
    }

    render() {
        if(this.state.showSplash){
            return <Splash/>
        }else
            return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#260a81" barStyle="light-content" />

                
                <Header navigation = {this.props.navigation}/>
                

                <View style = {styles.title}>
                        <Text style = {styles.titleText}>
                            Cupones destacados
                        </Text>
                </View>

                <View style = {styles.flatlist}>
                    <FlatList
                        showsHorizontalScrollIndicator={true}
                        horizontal = {true}
                        data={this.state.coupons}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item, index}) => this.renderCoupon(item, index)}
                    />
                </View>

                <View style = {styles.citiesContainer}>

                    <View style = {styles.title}>
                        <Text style = {styles.titleText}>
                            Ciudades
                        </Text>
                    </View>

                    <ScrollView style = {{alignSelf: 'stretch'}}>
                        {this.state.cities.map((city, map) => {
                            return(
                                <TouchableOpacity style = {styles.city} onPress = {() => {
                                    this.props.navigation.navigate('Categories', {city: city})
                                }}>
                                    <Text style = {styles.cityText}>
                                        {city.nombre}
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

  privacy: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20
  },

  privacyText: {
    fontSize: 10
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

  city: {
      padding: 10,
      paddingLeft: 20,
      backgroundColor: '#f7c00b',
      alignSelf: 'stretch',
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderBottomWidth: 0.5
  },

  cityText: {
    color: '#260a81',
    fontSize: 20
  },

  flatlist: {
      alignSelf: 'stretch',
      backgroundColor:'#260a81',
  },

  coupon: {
    backgroundColor: '#260a81',
    width: width,
  },

  citiesContainer: {
      flex: 7,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#f7c00b'
  },

  indicator: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  indicatorText: {
    color: '#260a81',
    fontSize: 10,
    fontWeight: 'bold'
  },

});
