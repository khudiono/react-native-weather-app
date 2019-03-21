import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SearchBar, Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Ionicons, MaterialCommunityIcons , MaterialIcons }from '@expo/vector-icons';
import { API_KEY } from '../config.js';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      data: {},
      forecast: [],
    };

    this.getCoords = this.getCoords.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.getForecast = this.getForecast.bind(this);
    this.structureData = this.structureData.bind(this);
    this.getCoordWeather = this.getCoordWeather.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.structureForecast = this.structureForecast.bind(this);
  }


  updateSearch (search) {
    this.setState({ search });
  };

  structureData (weather) {
    let data = {
      temperature: weather.main.temp,
      min: weather.main.temp_min,
      max: weather.main.temp_max,
      condition: weather.weather[0].main,
      city: weather.name,
      description: weather.weather[0].description,
      country: weather.sys.country,
      city_id: weather.id
    };
    this.setState({ data : data });
  }

  getWeather (city, country = 'us') {
    let nums = '0123456789'.split('');
    if(city.includes(',')) {
      let arr = city.split(',');
      city = arr[0];
      country = arr[1];
    }
    if(city.includes(nums)){
      let zipcode = Number(city);
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID=${API_KEY}&units=imperial`
      )
      .then(res => {
        return res.json()
      })
      .then(weather => {
        this.structureData(weather);
      })
      .then(() => {
        this.getForecast(this.state.data.city_id);
      })
    } else {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`
      )
        .then(res => {
          return res.json()
        })
        .then(weather => {
          this.structureData(weather);
        })
        .then(() => {
          this.getForecast(this.state.data.city_id);
        })
    }
  }

  structureForecast (data) {
    let forecast = [];
    data.forEach(day => {
      forecast.push({
        temp: day.main.temp,
        min: day.main.temp_min,
        max: day.main.temp_max,
        date: day.dt,
        day: day['dt_txt'],
        condition: day.weather[0].main
      })
    })
    return forecast;
  }

  getForecast (city_id) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&APPID=${API_KEY}&units=imperial`
    )
    .then(res => {
      return res.json()
    })
    .then(data => {
      return this.structureForecast([data.list[2], data.list[10], data.list[18]]);
    })
    .then(forecast => {
      this.setState({ forecast })
    })
    .then(() => {
      this.props.navigation.navigate('Weather', {weather: this.state.data, forecast: this.state.forecast});
    })
  }

  getCoordWeather(lat,long) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => {
        return res.json();
      })
      .then( weather => {
        this.structureData(weather);
      })
      .then(() => {
        this.getForecast(this.state.data.city_id);
      })
  }

  getCoords() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getCoordWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        console.log('ERROR')
      }
    )
  }

  handleSubmit() {
    this.getWeather(this.state.search);
  }

  render() {
    return (
      <ImageBackground source={require('../assets/night-bg.jpg')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.container}>
          <SearchBar
            placeholder="Search City..."
            inputContainerStyle={{
              backgroundColor: 'white',
              opacity: 0.6,
              borderRadius: 10
            }}
            containerStyle={{
              backgroundColor: 'transparent'
            }}
            onChangeText={this.updateSearch}
            onSubmitEditing={this.handleSubmit}
            value={this.state.search}
            platform="ios"
          />
          <View style={styles.right}>
            <Button
              title=" Use current location"
              titleStyle={{color:'black',fontSize:15, fontWeight:'bold'}}
              type="clear"
              onPress={this.getCoords}
              icon={
                <MaterialIcons
                  name="location-searching"
                  size={18}
                  color='black'
                  style={styles.locationIcon}
                />
              }
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    marginTop: -15,
    paddingLeft: 180,
    fontFamily: 'Futura',
    fontWeight: 'bold',
    fontSize: 9,
  },
  locationIcon: {
    paddingLeft: '1%'
  },
  searchIcon: {
    paddingRight: '1%'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default Search;
