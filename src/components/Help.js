import React, {Component} from 'react';
import {ScrollView, StyleSheet, Image, View, TouchableOpacity, Dimensions,Platform} from 'react-native';

import Icon from 'react-native-ionicons'

const {height, width} = Dimensions.get('window');

export default class Help extends Component {

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
                        {this.props.navigation.state.routeName != 'Help' ? <TouchableOpacity onPress = {() => {this.props.navigation.navigate('help')}}>
                            <Icon name="help" size = {30} color = {'#260a81'}/>
                        </TouchableOpacity> : null}
                    </View>
                </View>

                <View style = {{flex: 1, alignItems: "flex-start"}}>
                    <ScrollView contentContainerStyle = {styles.help}>
                        <Image
                                style = {{width: width, height: 5575 * width / 2740}}
                                resizeMode = {'contain'}
                                source = {require('../../resources/help.jpg')}
                        />
                    </ScrollView>
                </View>
               

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#260a81'
  },

  help: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
