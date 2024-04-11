// Sidebar.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      <View style={styles.top}>
        <Text>Menu</Text>
      </View>
        <View style={styles.mid}>
        <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Miembros"
        onPress={() => navigation.navigate('Miembros')}
      />
         <Button
        title="Servicios"
        onPress={() => navigation.navigate('Servicios')}
      />

        </View>
        <View style={styles.bottom}>
        <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Registrar')}
      />
         <Button
        title="Iniciar Sesión"
        onPress={() => navigation.navigate('Login')}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
   
  },
  top: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mid: {
    flex: 1,
    padding: 10,
    gap:10
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    gap:10
  },
});

export default Sidebar;
