import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-vector-icons';
import GetTime from '../util/Time';
import {DarkTheme} from '@react-navigation/native';

export default function Details(props) {
  const {aqi} = props;
  const [color, setColor] = React.useState('green');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    let data = parseInt(aqi);

    if (data < 50) {
      setColor('green');
      setMessage('Good');
    } else if (data > 50 && data < 100) {
      setColor('yellow');
      setMessage('Moderate');
    } else if (data > 100 && data < 150) {
      setColor('Orange');
      setMessage('Unhealthy for sensitive groups');
    } else if (data > 151 && data < 200) {
      setColor('red');
      setMessage('Unhealthy');
    } else if (data > 201 && data < 300) {
      setColor('violet');
      setMessage('Very Unhealthy');
    } else {
      setColor('brown');
      setMessage('Hazardous');
    }
  }, [aqi]);

  return (
    <View style={style.container}>
      <Text
        style={{
          color:
            GetTime() > 18 || GetTime() < 7
              ? DarkTheme.colors.text
              : DarkTheme.colors.border,
        }}>
        {aqi}
      </Text>
      <View>
        {/* <Icon name="leaf" size={20} color={color} /> */}
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color:
              GetTime() > 18 || GetTime() < 7
                ? DarkTheme.colors.text
                : DarkTheme.colors.border,
            marginTop: 15,
          }}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
