import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import dailyStats from '../screens/dailyStats';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'State Statistics';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="State Statistics"
        component={dailyStats}
        options={{
          title: 'State Statistics',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-stats" />,
        }}
      />
      <BottomTab.Screen
        name="Aggregate Statistics"
        component={LinksScreen}
        options={{
          title: 'Aggregate Statistics',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-trending-up" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'State Statistics':
      return 'US Coronavirus Statistics by State';
    case 'Aggregate Statistics':
      return 'US Cumulative Coronavirus Stats';
  }
}
