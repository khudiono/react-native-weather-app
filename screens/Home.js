import React from 'react';
import { StyleSheet, Text, View , ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { AppLoading, Asset, Font } from 'expo';
import { MaterialCommunityIcons }from '@expo/vector-icons';
import { Button } from 'react-native-elements';

class Home extends React.Component {
  render() {
    return (
      <ImageBackground source={require('../assets/beach.jpg')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.title}>
          <Text style={styles.header}>WEATHER APP</Text>
          <Button buttonStyle={{width:175,
            height:45,
            borderRadius:25,
            backgroundColor:'seashell',
            opacity:0.4}}
            title="Check weather"
            titleStyle={{color:'black', fontFamily:'Futura'}}
            icon={
              <MaterialCommunityIcons
                name="weather-partlycloudy"
                size={25}
                color='teal'
                style={{paddingLeft: '3%'}}
              />
            }
            iconRight
            onPress={() => this.props.navigation.navigate('Search')}
          />
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    padding: '2%',
    fontFamily: 'Futura',
    color: 'white',
  },
});

export default Home;
