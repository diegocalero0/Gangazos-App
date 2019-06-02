/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, Image, Dimensions, StatusBar, Platform, StyleSheet, Text, View, ScrollView, Linking} from 'react-native';

import Header from './Header'
import Icon from 'react-native-ionicons'

import QRCode from 'react-native-qrcode-svg';
import firebase from 'react-native-firebase';

const {height, width} = Dimensions.get('window');

export default class Coupon extends Component {

    constructor(props){
        super(props);

        this.state = {
           
            category: '',
            subCategory: '',
            city: '',
            coupon: {}
        }

    }

    componentWillMount(){
        this.setState({
            coupon: this.props.navigation.getParam('coupon', {})
        }, () => {
            this.setState({
                city: this.state.coupon.ciudad,
                category: this.state.coupon.categoria,
                subCategory: this.state.coupon.subcategoria
            })

            firebase.firestore().collection('cupones').doc(this.state.coupon.id).update({
              obtenido: this.state.coupon.obtenido + 1
            })

        })
    }

    

    renderCoupon(coupon){

        let inicio = new Date(coupon.inicio.seconds * 1000);
        let fin = new Date(coupon.fin.seconds * 1000);

        return(
            <View style = {styles.coupon}>
                <Image
                resizeMode = {'contain'}
                style={{width: width, height: width * 576 / 1024}}
                source={{uri: coupon.imagen}}
                />

                <ScrollView contentContainerStyle = {styles.infoCoupon}>
                    <Text style = {styles.nameCoupon}>
                        {coupon.nombre}
                    </Text>

                    <Text style = {styles.descriptionCoupon}>
                        {coupon.descripcion}
                    </Text>

                    <Text style = {styles.infoTextCoupon}>
                        {'Este cupón es válido desde '
                        + (inicio.getDate() > 9 ? inicio.getDate() : '0' + inicio.getDate()) + '/' + ((inicio.getMonth() + 1) > 9 ? (inicio.getMonth() + 1) : '0' + (inicio.getMonth() + 1)) + '/' + inicio.getFullYear()
                        + ' hasta '
                        + (fin.getDate() > 9 ? fin.getDate() : '0' + fin.getDate()) + '/' + ((fin.getMonth() + 1) > 9 ? (fin.getMonth() + 1) : '0' + (fin.getMonth() + 1)) + '/' + fin.getFullYear()
                        }
                    </Text>

                    <View style = {styles.qr}>
                        <QRCode
                            size = {150}
                            value={coupon.id}
                        />
                    </View>

                    <View style = {styles.direccion}>
                        <Text style = {styles.infoTextCouponDireccion}>
                            {'Válido en: ' + coupon.sucursal + ' '}
                        </Text>

                        {coupon.sucursal != 'Todas las sucursales' ? <TouchableOpacity onPress = {() => {
                            this.props.navigation.navigate('MapCoupon', {coupon: coupon})
                        }}>
                                <Text style = {styles.find}>
                                    {'Encuéntralo aquí'}
                                </Text>
                            </TouchableOpacity> : null}

                    </View>

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
                                {this.state.city}
                            </Text>

                            <View style = {{paddingHorizontal: 5}}><Icon name="arrow-dropright" size = {20} color = {'#260a81'}/></View>

                            <Text style = {styles.cityNameText}>
                                {this.state.category}
                            </Text>

                            <View style = {{paddingHorizontal: 5}}><Icon name="arrow-dropright" size = {20} color = {'#260a81'}/></View>
                            
                            <Text style = {styles.cityNameText}>
                                {this.state.subCategory}
                            </Text>
                            
                    </View>
                </View>

                <View style = {styles.flatlist}>
                    {this.renderCoupon(this.state.coupon)}
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

  privacy: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    alignSelf: 'stretch',
    backgroundColor: 'white'
  },

  privacyText: {
    fontSize: 10
  },

  direccion: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width
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
    fontSize: 12
  },

  infoTextCoupon: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    margin: 20
  },

  infoTextCouponDireccion: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },

  find: {
    fontSize: 12,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline'
  },

  infoCoupon: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 5,
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
      backgroundColor:'white',
      flex: 1
  },

  coupon: {
    flex: 1,
    backgroundColor: 'white',
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
  }

});
