import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home.Screen';
import MyOrder from './MyOrder.Screen';
import Goodbye from './GoodBye.Screen';

import { BLACK, LIGHT_TAN, TAN } from '../../utils/constants';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: LIGHT_TAN,
          width: 240,
        },
        drawerType: 'slide',
        drawerActiveTintColor: BLACK,
        drawerActiveBackgroundColor: TAN,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="My Order" component={MyOrder} />
      <Drawer.Screen name="Sign Out" component={Goodbye} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
