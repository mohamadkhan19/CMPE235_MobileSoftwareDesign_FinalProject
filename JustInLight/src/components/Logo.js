import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';


export default class Logo extends React.Component {
    render(){
      return(
         <Image style={{width:310, height: 120}}
         source={require('../images/JILLogo.png')}/>


      )
    }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
