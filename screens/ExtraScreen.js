import React from 'react';
import { View, Text, StyleSheet, FlatList,Pressable } from 'react-native';

const ExtraScreen = ({ navigation }) => {

  const menuItems = [
    { key: "Noticias Especificas", title: "NOTICIAS ESPECIFICAS" },
    { key: "Reportar Situacion", title: "REPORTAR SITUACION" },
    { key: "Mis Situaciones", title: "MIS SITUACIONES" },
    { key: "Mapa de Situaciones", title: "MAPA DE SITUACIONES" },
    { key: "Cambiar Contraseña", title: "CAMBIAR CONTRASEÑA" },
   
  

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
    <View style={styles.container}>
      <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            style={styles.flatlist}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height:'100%',
    width:'100%',
    backgroundColor: "#fff",
    

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
   
  
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fb7405",
    fontWeight: "bold",
  }
});

export default ExtraScreen;
