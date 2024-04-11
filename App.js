import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './components/SideBar';
import HomeScreen from './screens/HomeScreen';
import Login from './components/Login';
import Miembros from './components/Members';
import Registrar from './components/RegisterForm';
import Servicios from './components/Services';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={({ navigation }) => <Sidebar navigation={navigation} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Registrar" component={Registrar} />
        <Drawer.Screen name='Miembros' component={Miembros} />
        <Drawer.Screen name='Servicios' component={Servicios} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
