import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Loader from './Loader';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adamix.net/defensa_civil/def/servicios.php');
        setServices(response.data.datos);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Image source={{ uri: item.foto }} style={styles.serviceImage} />
        <Text style={styles.serviceName}>{item.nombre}</Text>
        <Text style={styles.serviceDescription}>{item.descripcion}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Servicios</Text>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
    color: '#fb7405',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a509e',
    borderRadius: 10,
    marginBottom: 2,
    padding: 20,
  },
  serviceImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 5,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fb7405',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
});

export default ServicesList;
