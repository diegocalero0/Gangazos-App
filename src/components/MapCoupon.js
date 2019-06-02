/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, StatusBar, Platform, StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';

import MapView, { PROVIDER_GOOGLE , Marker} from 'react-native-maps';
import Header from './Header'



const {height, width} = Dimensions.get('window');

export default class MapCoupon extends Component {

    constructor(props){
        super(props);

        this.state = {
            coupon: {coordenadas: {latitude: 0, longitude: 0}}
        }

    }

    componentWillMount(){
        this.setState({
            coupon: this.props.navigation.getParam('coupon', {})
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#260a81" barStyle="light-content" />
                <Header navigation = {this.props.navigation}/>

                <View style = {styles.map}>
                    <MapView
                        style = {{width: width, flex: 1}}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: this.state.coupon.coordenadas._latitude,
                            longitude: this.state.coupon.coordenadas._longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <MapView.Marker
                        coordinate={{
                            latitude: this.state.coupon.coordenadas._latitude,
                            longitude: this.state.coupon.coordenadas._longitude,
                        }}
                        title={'Dirección'}
                        description={this.state.coupon.sucursal}
                        />

                    </MapView>
                </View>

                <View style = {styles.branch}>
                    <Text style = {styles.branchText}>
                        {this.state.coupon.sucursal}
                    </Text>
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

  map: {
    flex: 1,
    width: width
  },

  branch: {
      width: width,
      height: 50,
      backgroundColor: '#260a81',
      alignItems: 'center',
      justifyContent: 'center'
  },

  branchText: {
      fontSize: 16,
      color: 'white',
      padding: 2
  },

  privacy: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20
  },

  privacyText: {
    fontSize: 10,
    color: 'white'
  },
});
