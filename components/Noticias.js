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
        <Loader />
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
    backgroundColor: '#0a509e',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fb7405',
  },
  flatListContainer: {
    alignItems: 'center',
  },
  noticiaContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
  },
  noticiaImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
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
    color: '#fb7405',
  },
  noticiaContenido: {
    fontSize: 16,
  },
});

export default Noticias;
