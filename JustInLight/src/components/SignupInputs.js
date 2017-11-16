import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {Actions} from 'react-native-router-flux';

class Inputs extends Component {
   state = {
      name: '',
      email: '',
      password: ''
   }
   handleName = (text) => {
      this.setState({ name: text })
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (name, email, pass) => {
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/user/signup', {
         method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         name: name,
         email: email,
         password: pass
         })
      })
      Actions.Login()
   }
   render(){
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {this.handleName}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#ffffff"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}
               secureTextEntry={true} />
               
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.name, this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Register </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 150
   },
   input: {
      margin: 15,
      height: 40,
      width: 300,
      borderColor: '#000000',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#000000',
      padding: 10,
      margin: 15,
      height: 40,
      width: 300
   },
   submitButtonText:{
      color: 'white'
   }
})