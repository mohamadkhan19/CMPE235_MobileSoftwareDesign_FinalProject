import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';

import Logo from '../components/Logo';

import {Actions} from 'react-native-router-flux';

export default class Signup extends React.Component {

    render(){
      return(
        <View style={styles.container}>

        <View style={styles.container1}>
          <StatusBar
            backgroundColor="blue"
            barStyle="dark-content"
          />
        </View>

        <View style={styles.container}>
          <Logo/>

        </View>

        <View style={styles.container}>

        <Text style={{fontSize:25}}> Sign Up Page  </Text>
        </View>


        </View>


      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container1: {
    flex: 1,
  },
});
