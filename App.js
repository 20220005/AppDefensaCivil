import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './components/SideBar';
import HomeScreen from './screens/HomeScreen';
import Login from './components/Login';
import Miembros from './components/Members';
import QuieroSerVoluntario from './components/RegisterForm';
import Servicios from './components/Services';
import Noticias from "./components/Noticias"
import Videos from "./components/Videos";
import Albergues from "./components/Albergues";
import NoticiasEspecificas from "./components/NoticiasEspecificas";
import ExtraScreen from "./screens/ExtraScreen";
import MededidasPreventivas from './components/MedidasPreventivas';
import RecuperarContraseña from './components/RecuperarContraseña';
import CambiarContraseña from './components/CambiarContrasea';
import MapaInteractivo from './components/MapaInteractivo';
import MisSituaciones from './components/MisSituaciones';
import ReportarSituaciones from './components/ReportarSituacion';
import MapadeSituaciones from './components/MapaSituaciones';
import Historia from './components/Historia';
import AcercaDe from './components/AcercaDe';
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={({ navigation }) => <Sidebar navigation={navigation} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Historia" component={Historia} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Quiero Ser Voluntario" component={QuieroSerVoluntario} />
        <Drawer.Screen name='Miembros' component={Miembros} />
        <Drawer.Screen name='Servicios' component={Servicios} />
        <Drawer.Screen name='Noticias' component={Noticias} />
        <Drawer.Screen name='Videos' component={Videos} />
        <Drawer.Screen name='Albergues' component={Albergues} />
        <Drawer.Screen name='Noticias Especificas' component={NoticiasEspecificas} />
        <Drawer.Screen name='Extras' component={ExtraScreen} />
        <Drawer.Screen name='Medidas Preventivas' component={MededidasPreventivas} />
        <Drawer.Screen name='Recuperar' component={RecuperarContraseña} />
        <Drawer.Screen name='Cambiar Contraseña' component={CambiarContraseña} />
        <Drawer.Screen name='Mapa Albergues' component={MapaInteractivo} />
        <Drawer.Screen name='Mis Situaciones' component={MisSituaciones} />
        <Drawer.Screen name='Reportar Situacion' component={ReportarSituaciones} />
        <Drawer.Screen name='Mapa de Situaciones' component={MapadeSituaciones} />
        <Drawer.Screen name='Acerca De' component={AcercaDe} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
