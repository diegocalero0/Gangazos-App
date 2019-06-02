/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, Image, Dimensions, StatusBar, Platform, StyleSheet, Text, View, FlatList, ScrollView, Linking} from 'react-native';

import Header from './Header'

import firebase from 'react-native-firebase';
import Icon from 'react-native-ionicons'

const {height, width} = Dimensions.get('window');

export default class Coupons extends Component {

    constructor(props){
        super(props);

        this.state = {
           
            category: {},
            subCategory: {},
            city: {},
            coupons: []
        }

    }

    componentWillMount(){

        this.setState({
            city: this.props.navigation.getParam('city', {}),
            category: this.props.navigation.getParam('category', {}),
            subCategory: this.props.navigation.getParam('subCategory', {})
        }, () => {
            firebase.firestore().collection('cupones').where('ciudad', '==', this.state.city.nombre)
            .where('categoria', '==', this.state.category.nombre)
            .where('subcategoria', '==', this.state.subCategory.nombre)
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
        })
    }

    renderCoupon(coupon, index){
        return(
            <View style = {styles.coupon}>
                <Image
                resizeMode = {'contain'}
                style={{width: width, height: width * 576 / 1024}}
                source={{uri: coupon.imagen}}
                />
                <View style = {styles.infoCouponIndicador}>
                    <View style = {styles.indicator}>
                        <Text style = {styles.indicatorText}>
                            {index + 1 + ' de ' + this.state.coupons.length}
                        </Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle = {styles.infoCoupon}>
                    

                    <Text style = {styles.nameCoupon}>
                        {coupon.nombre}
                    </Text>

                    <Text style = {styles.descriptionCoupon}>
                        {coupon.descripcion}
                    </Text>

                    <Text style = {styles.infoTextCoupon}>
                        Haz click en *Obtener cupón* y muestra el cupón con su código único para adquirir
                        la oferta
                    </Text>

                    <TouchableOpacity style = {styles.button} onPress = {() => {
                      this.props.navigation.navigate('Coupon', {
                        city: this.state.city,
                        category: this.state.category,
                        coupon: coupon
                      })
                    }}>
                        <Text style = {styles.buttonText}>
                            OBTENER CUPÓN
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
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

                            <View style = {{paddingHorizontal: 5}}><Icon name="arrow-dropright" size = {20} color = {'#260a81'}/></View>
                            
                            <Text style = {styles.cityNameText}>
                                {this.state.subCategory.nombre}
                            </Text>

                    </View>
                </View>

                <View style = {styles.title}>
                        <Text style = {styles.titleText}>
                            Cupones
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
                <TouchableOpacity style = {styles.privacy}onPress = {() => {
                        Linking.openURL('https://gangazos.herokuapp.com/politicas').catch((err) => console.error('An error occurred', err));
                    }}>
                        <Text style = {styles.privacyText}>
                            Politicas de privacidad
                        </Text>
                    </TouchableOpacity>
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

  indicator: {
    backgroundColor: '#260a81',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 5
  },

  indicatorText: {
    color: 'white'
  },

  button: {
    backgroundColor: 'black',
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
    marginTop: 0
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },

  nameCoupon: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  },

  descriptionCoupon: {
    textAlign: 'center',
    color: 'black',
  },

  infoTextCoupon: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    margin: 20
  },

  infoCoupon: {
    backgroundColor: '#f7c00b',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20
  },

  infoCouponIndicador: {
    backgroundColor: '#f7c00b',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20
  },

  cityName: {
    flexDirection: 'row',
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
      backgroundColor:'#f7c00b',
      flex: 1
  },

  coupon: {
    flex: 1,
    backgroundColor: '#260a81',
    width: width,
    flexWrap: "wrap"
  },

  citiesContainer: {
      flex: 7,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#f7c00b'
  },

  categoriesContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7c00b'
  },

  privacy: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    alignSelf: 'stretch',
    backgroundColor: '#f7c00b'
  },

  privacyText: {
    fontSize: 10,
  },

});
