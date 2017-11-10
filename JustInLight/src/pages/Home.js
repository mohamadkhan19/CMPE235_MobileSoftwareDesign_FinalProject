import React from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, Button } from 'react-native';

import Logo from '../components/Logo';
//import Login from './components/Login';


import {Actions} from 'react-native-router-flux';

export default class Home extends React.Component {

   Login(){
     Actions.Login()
   }
   Signup(){
     Actions.Signup()
   }
    render(){
      return(
        <View style={styles.container}>

        <View style={styles.container}>

        </View>
        <View style={styles.container}>
          <Logo/>

        </View>

        <View style={styles.container}>

        </View>

        <View style={styles.container}>
        <Text style={{fontSize:25}}> Welcome  </Text>
        <Text style={{fontSize:25}}> Rent to Own R2 Platform  </Text>
        </View>

        <View style={styles.button}>
        <Button
         onPress={this.Signup}
         title = "Create Account"
        />
        </View>

        <View style={styles.button}>
        <Button
           onPress={this.Login}
           title="Login"
         />

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
    backgroundColor: 'powderblue',
    //alignItems: 'center',
    //justifyContent: 'flex-start',
  },
  button: {
    marginBottom: 30,
    width: 300,
    alignItems: 'center',
    backgroundColor: '#455a64'

  },

});
