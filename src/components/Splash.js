/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, StyleSheet, Image, View} from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>

        <StatusBar backgroundColor="#f7c00b" barStyle="dark-content" />

        <Image
            style = {{width: '50%'}}
            resizeMode = {'contain'}
            source = {require('../../resources/name.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7c00b',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
