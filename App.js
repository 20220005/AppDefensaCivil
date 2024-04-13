import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './components/SideBar';
import HomeScreen from './screens/HomeScreen';
import Login from './components/Login';
import Miembros from './components/Members';
import Registrar from './components/RegisterForm';
import Servicios from './components/Services';
import Noticias from "./components/Noticias"
import Videos from "./components/Videos";
import Albergues from "./components/Albergues";
import NoticiasEspecificas from "./components/NoticiasEspecificas";
import ExtraScreen from "./screens/ExtraScreen";
import MededidasPreventivas from './components/MedidasPreventivas';
import RecuperarContraseña from './components/RecuperarContraseña';
import CambiarContraseña from './components/CambiarContrasea';

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
        <Drawer.Screen name='Noticias' component={Noticias} />
        <Drawer.Screen name='Videos' component={Videos} />
        <Drawer.Screen name='Albergues' component={Albergues} />
        <Drawer.Screen name='Noticias Especificas' component={NoticiasEspecificas} />
       <Drawer.Screen name='Extras' component={ExtraScreen} />
       <Drawer.Screen name='MedidasPreventivas' component={MededidasPreventivas} />
       <Drawer.Screen name='Recuperar' component={RecuperarContraseña} />
       <Drawer.Screen name='Cambiar Contraseña' component={CambiarContraseña} />

       
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
