import React from 'react';
import Details from './Details';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Button,
  Text,
} from 'react-native';
import {DarkTheme} from '@react-navigation/native';
import GetTime from '../util/Time';
import Axios from 'axios';

const Home = () => {
  const [location, setLocation] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [res, setRes] = React.useState(null);
  const [particles, setPartciles] = React.useState(null);

  const handleClick = async () => {
    try {
      let data = await Axios.get(
        `https://api.waqi.info/feed/${location}/?token=15058dc7ed478310e48d69a5c7d89f96d69c3a1f`,
      );
      if (data.data.data.aqi) {
        setRes(data.data.data.aqi);
        setErr(null);
      } else {
        setErr(
          `Can't find the air quality of ${location} city. Try a different name`,
        );
      }
      setPartciles([{...data.data.data.iaqi}]);
      console.log({...data.data.data.iaqi});
    } catch (error) {
      console.log(error);
      setErr('An unknown err occurred. Please Try After Some time');
    }
  };

  const handleTextChange = e => {
    setLocation(e);
  };

  const renderDetails = () => {
    return <Details aqi={res} />;
  };

  return (
    <View style={stylesheet.container}>
      <StatusBar hidden={true} />
      <TextInput
        style={stylesheet.textbox}
        placeholder="Enter City Name Here"
        placeholderTextColor={
          GetTime() > 18 || GetTime() < 7
            ? DarkTheme.colors.text
            : DarkTheme.colors.border
        }
        returnKeyType="search"
        onSubmitEditing={handleClick}
        keyboardType="default"
        keyboardAppearance={GetTime() > 18 || GetTime() < 7 ? 'dark' : 'light'}
        onChangeText={handleTextChange}
      />
      <Button
        title="Go"
        onPress={handleClick}
        color={GetTime() > 18 || GetTime() < 7 ? 'white' : 'black'}
        style={stylesheet.button}
      />
      {res && !err ? renderDetails() : <React.Fragment />}
      {err ? (
        <Text
          style={{
            color:
              GetTime() > 18 || GetTime() < 7
                ? DarkTheme.colors.text
                : DarkTheme.colors.border,
          }}>
          {err}
        </Text>
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textbox: {
    height: 50,
    width: Dimensions.get('window').width - 30,
    borderColor:
      GetTime() > 18 || GetTime() < 7
        ? DarkTheme.colors.text
        : DarkTheme.colors.border,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    color: DarkTheme.colors.primary,
    margin: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#e6891d',
    height: 10,
    width: 50,
  },
});

export default Home;
