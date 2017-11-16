import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button, Navigator } from 'react-native';
import Input from '../components/LoginInputs.js'
import Logo from '../components/Logo';

import {Actions} from 'react-native-router-flux';

export default class Login extends React.Component {

    render(){
      return(
        <View style={styles.container}>
        <Text style={{fontSize:25}}> Login Page  </Text>
        <View style={styles.container1}>
          
        </View>
        <View style={styles.container}>
          <Logo/>

        </View>

        <View style={styles.container}>

        
        </View>

        <Input />
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