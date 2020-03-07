import React from 'react';
import Home from './Home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import GetTime from './util/Time';

const Tabs = createBottomTabNavigator();

const Navigator = () => {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    setTheme(GetTime());
  }, []);

  return (
    <NavigationContainer
      theme={theme > 18 || theme < 7 ? DarkTheme : DefaultTheme}>
      <Tabs.Navigator lazy initialRouteName="Home" backBehavior="history">
        <Tabs.Screen name="Home" component={Home} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
