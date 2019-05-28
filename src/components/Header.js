/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity, Dimensions} from 'react-native';

import Icon from 'react-native-ionicons'

const {height, width} = Dimensions.get('window');

export default class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            help: true
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.header}>
                    <View style = {styles.menu}>
                    {this.props.navigation.state.routeName == 'Cities' ? null :
                        <TouchableOpacity onPress = {() => {
                            this.props.navigation.goBack()
                        }}>
                            <Icon name="arrow-back" size = {30} color = {'#260a81'}/>
                        </TouchableOpacity> }
                    </View>

                    <View style = {styles.title}>
                        <Image
                            style = {{width: '100%'}}
                            resizeMode = {'contain'}
                            source = {require('../../resources/name.png')}
                        />
                    </View>

                    <View style = {styles.box}>
                        <TouchableOpacity onPress = {() => {this.props.navigation.navigate('Help')}}>
                            <Icon name="help" size = {30} color = {'#260a81'}/>
                        </TouchableOpacity>
                    </View>
                </View>

               

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },

  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7c00b',
  },

  menu: {
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: 10
  },

  title: {
      flex: 1,
      alignItems: 'center',
  },

  box: {
      flex: 1,
      alignItems: 'flex-end',
      paddingRight: 10
  }

});
