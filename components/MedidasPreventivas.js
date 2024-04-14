import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import Loader from "./Loader";
import { FlatList } from "react-native-gesture-handler";

const MededidasPreventivas = () => {
  const [medidas, setMedidas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://adamix.net/defensa_civil/def/medidas_preventivas.php"
        );
        setMedidas(response.data.datos);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de las Medidas: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.medidasContainer}>
      <Text style={styles.mededidatitulo}>{item.titulo}</Text>
      <Image source={{ uri: item.foto }} style={styles.medidaImagen} />
      <Text style={styles.medidasDescripcion}>{item.descripcion}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Medidas Preventivas</Text>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            data={medidas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: windowHeight * 0.01,
  },
  title: {
    fontSize: windowWidth * 0.08, 
    marginBottom: windowHeight * 0.03, 
    marginTop: windowHeight * 0.02, 
    color: "#fb7405",
    fontWeight: 'bold',
  },
  flatListContainer: {
    alignItems: "center",
  },
  medidasContainer: {
    padding: windowWidth * 0.05,
    marginBottom: windowHeight * 0.05, 
    width: windowWidth - windowWidth * 0.1, 
    alignItems: "center",
    backgroundColor: "#0a509e", // Color de fondo
    borderRadius: 10, // Bordes redondeados
  },
  mededidatitulo: {
    fontSize: windowWidth * 0.06, 
    fontWeight: "bold",
    marginBottom: windowHeight * 0.02, 
    color: "#fb7405", // Color del texto
  },
  medidaImagen: {
    width: windowWidth - windowWidth * 0.1,
    height: windowHeight * 0.3,
    resizeMode: "contain",
    marginBottom: windowHeight * 0.02, 
    borderRadius: 10, // Bordes redondeados
  },
  medidasDescripcion: {
    fontSize: windowWidth * 0.04,
    marginBottom: windowHeight * 0.02,
    color: "#fff", // Color del texto
  },
});

export default MededidasPreventivas;
