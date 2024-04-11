import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Loader from './Loader';
import axios from 'axios';

const Noticias = () => {
const [noticias, setNoticias] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get('https://adamix.net/defensa_civil/def/noticias.php');
        setNoticias(response.data.datos);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.noticiaContainer}>
      <Image source={{ uri: item.foto }} style={styles.noticiaImage} />
      <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
      <Text style={styles.noticiaFecha}>{item.fecha}</Text>
      <Text style={styles.noticiaContenido}>{item.contenido}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias</Text>
      {loading ? (
        <Loader/>
      ) : (
        <FlatList
          data={noticias}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  noticiaContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  noticiaImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  noticiaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noticiaFecha: {
    fontSize: 16,
    marginBottom: 5,
  },
  noticiaContenido: {
    fontSize: 16,
  },
});

export default Noticias;
