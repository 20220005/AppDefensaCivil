import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import icono from "../assets/icon-defensa-civil.png";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Sidebar = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
 
      if (token) {
        
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error al obtener el token de AsyncStorage:", error);
    }
  };
  
  useEffect(() => {
    

    checkLoginStatus();
  }, [isLoggedIn,checkLoginStatus]);

const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("nombre");
    await AsyncStorage.removeItem("apellido");
    await AsyncStorage.removeItem("correo");
    await AsyncStorage.removeItem("telefono");
    setIsLoggedIn(false);
    navigation.navigate("Home");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

const menuItems = [
    { key: "Home", title: "HOME" },
    { key: "Historia", title: "Historia" },
    { key: "Servicios", title: "SERVICIOS" },
    { key: "Noticias", title: "NOTICIAS" },
    { key: "Videos", title: "VIDEOS" },
    { key: "Albergues", title: "ALBERGUES" },
    { key: "Mapa Albergues", title: "MAPA ALBERGUES" },
    { key: "Medidas Preventivas", title: "MEDIDAS PREVENTIVAS" },
    { key: "Miembros", title: "MIEMBROS" },
    { key: "Quiero Ser Voluntario", title: "QUIERO SER VOLUNTARIO" },
  ];
  const menuItemsLogin = [
    { key: "Home", title: "HOME" },
    { key: "Historia", title: "Historia" },
    { key: "Servicios", title: "SERVICIOS" },
    { key: "Noticias", title: "NOTICIAS" },
    { key: "Videos", title: "VIDEOS" },
    { key: "Albergues", title: "ALBERGUES" },
    { key: "Mapa Albergues", title: "MAPA ALBERGUES" },
    { key: "Medidas Preventivas", title: "MEDIDAS PREVENTIVAS" },
    { key: "Miembros", title: "MIEMBROS" },
    { key: "Registrar", title: "QUIERO SER VOLUNTARIO" },
    { key: "Extras", title: "EXTRAS" },

  ];

  const renderItem = ({ item }) => (
    <View style={styles.mid}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(item.key)}
      >
        <Text style={styles.text}>{item.title}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.sidebar}>
      <View style={styles.top}>
        <Image source={icono} style={styles.icono} />
      </View>
      <View style={styles.mid}>
        {isLoggedIn ? (
          <FlatList
            data={menuItemsLogin}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            style={styles.flatlist}
          />
        ) : (
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            style={styles.flatlist}
          />
        )}
      </View>
      <View style={styles.bottom}>
        <Pressable
          style={{ ...styles.button, backgroundColor: "#0a509e" }}
          onPress={() => navigation.navigate("Quiero Ser Voluntario")}
        >
          <Text style={{...styles.text,color:'white'}}>REGISTRARSE</Text>
        </Pressable>

        {isLoggedIn ? (
          <Pressable
            style={{ ...styles.button, backgroundColor: "red" }}
            onPress={() => logout()}
          >
            <Text style={{...styles.text,color:'white'}}>CERRAR SESIÓN</Text>
          </Pressable>
        ) : (
          <Pressable
            style={{ ...styles.button, backgroundColor: "#0a509e" ,}}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{...styles.text,color:'white'}}>INICIAR SESIÓN</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "white",
  },
  top: {
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a509e",
    width: "100%",
  },
  icono: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  mid: {
    flex:1,
    height: "55%",
    

  },
  flatlist: {
    flex: 1,
    padding: 10,
    
  },
 
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
  text: {
    color: "#fb7405",
    fontWeight: "bold",
  },
  bottom: {
    height: "20%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    gap: 10,
  },
});

export default Sidebar;
