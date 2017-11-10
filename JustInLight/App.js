import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

// import Login from './src/pages/Login';

//import Home from './src/pages/Home';
import Routes from './src/Routes';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
        />
       <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
