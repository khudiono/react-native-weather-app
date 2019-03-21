import React from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      weather: {},
      city: '',
      condition: '',
      forecast: [],
    }
  }

  componentDidMount() {
    this.setState({
      weather: this.props.navigation.state.params.weather,
      city: this.props.navigation.state.params.weather.city,
      condition: this.props.navigation.state.params.weather.condition,
      forecast: this.props.navigation.getParam('forecast','none')
    })
  }


  render() {
    return (
      <ImageBackground source={require('../assets/sunset-mountain.jpg')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.weatherContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.city}>{this.state.weather.city}</Text>
            <Text style={styles.condition}>{this.state.weather.description}</Text>
            <Text style={styles.temp}>{this.state.weather.temperature}˚F</Text>
            <Text style={styles.temp2}>{this.state.weather.min}˚F / {this.state.weather.max}˚F</Text>
          </View>
          <View style={styles.forecast}>
            <View style={styles.rowDay}>
              {this.state.forecast.map(day => {
                return(
                  <Text style={styles.day} key={day.date}>{moment(day.day).calendar()}</Text>
                )
              })}
            </View>
            <View style={styles.row}>
              {this.state.forecast.map(day => {
                return(
                  <Text style={styles.dayTemp} key={day.date}>{day.min}˚F/{day.max}˚F</Text>
                )
              })}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    marginTop: -25,
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'left',
  },
  rowDay: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'left',
  },
  headerContainer: {
    flex: 1,
    paddingTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Futura',
    color: 'white'
  },
  city: {
    color: 'white',
    fontFamily: 'Futura',
    fontSize: 18,
  },
  day: {
    color: 'white',
    fontFamily: 'Futura',
    fontSize: 15,
    paddingRight: 40,
    width: 200,
  },
  dayTemp: {
    color: 'white',
    fontFamily: 'Futura',
    fontSize: 15,
    textAlign: 'right',
    alignSelf: 'flex-end'
  },
  condition: {
    color: 'white',
    fontFamily: 'Futura',
    fontWeight: 'bold',
    fontSize: 24,
  },
  temp: {
    fontSize: 70,
    fontFamily: 'Futura',
    fontWeight: 'bold',
    color: '#fff'
  },
  temp2: {
    fontSize: 16,
    fontFamily: 'Futura',
    color: '#fff'
  },
  forecast: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 320,
    marginBottom: -80,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default Weather;
