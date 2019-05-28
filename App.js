/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from "react-navigation";
import Cities from './src/components/Cities'
import Categories from './src/components/Categories'
import Coupons from './src/components/Coupons'
import Coupon from './src/components/Coupon'
import MapCoupon from './src/components/MapCoupon'
import SubCategories from './src/components/SubCategories'
import Help from './src/components/Help'

import firebase from 'react-native-firebase';

var config = {
  apiKey: "AIzaSyCRga2DutNQTlXRx4dTddlLihb6-yBjZRA",
  authDomain: "gangazos-28ba9.firebaseapp.com",
  databaseURL: "https://gangazos-28ba9.firebaseio.com",
  storageBucket: "gangazos-28ba9.appspot.com",
};

firebase.initializeApp(config);


const AppNavigator = createStackNavigator({
  Cities: {
    screen: Cities
  },
  Categories: {
    screen: Categories
  },
  Coupons: {
    screen: Coupons
  },
  Coupon: {
    screen: Coupon
  },
  MapCoupon: {
    screen: MapCoupon
  },
  SubCategories: {
    screen: SubCategories
  },
  Help: {
    screen: Help
  }

},
{
  headerMode: 'none'
})

export default createAppContainer(AppNavigator);