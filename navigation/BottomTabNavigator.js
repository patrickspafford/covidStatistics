import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import stateStats from '../screens/stateStats';
import cumulativeStats from '../screens/cumulativeStats';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'State Statistics';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="State Statistics"
        component={stateStats}
        options={{
          title: 'State Statistics',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-stats" />,
        }}
      />
      <BottomTab.Screen
        name="Aggregate Statistics"
        component={cumulativeStats}
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
