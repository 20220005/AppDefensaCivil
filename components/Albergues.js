import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Image, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Loader from './Loader';
import axios from 'axios';

const Albergues = () => {
  const [albergues, setAlbergues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adamix.net/defensa_civil/def/albergues.php');
        setAlbergues(response.data.datos);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ animated: true, index: 0 });
      }
      setSearchQuery('');
    }, [])
  );

  const handleShowMapModal = (lat, lng) => {
    if (lat && lng) {
      //el profesor puso la latitud y longitud al reves, por eso va lng primero
      const url = `https://www.google.com/maps/search/?api=1&query=${lng},${lat}`;
      Linking.openURL(url);
    } else {
      console.error('Las coordenadas son inválidas');
    }
  };

  const renderCard = ({ item, index }) => {
    const capacidadText = item.capacidad ? item.capacidad : ' - ';
    const isExpanded = expandedIndex === index;

    return (
      <Pressable
        style={styles.card}
        onPress={() => setExpandedIndex(isExpanded ? null : index)}
      >
        <Text style={styles.albergueCodigo}>{item.codigo}</Text>
        <Text style={styles.cardTitle}>{item.edificio}</Text>
        {isExpanded && (
          <View style={styles.detailsContainer}>
            <Text style={styles.details}><Text style={{ fontWeight: 'bold' }}>Ciudad: </Text>{item.ciudad}</Text>
            <Text style={styles.details}><Text style={{ fontWeight: 'bold' }}>Coordinador: </Text>{item.coordinador}</Text>
            <Text style={styles.details}><Text style={{ fontWeight: 'bold' }}>Télefono: </Text>{item.telefono}</Text>
            <Text style={styles.details}><Text style={{ fontWeight: 'bold' }}>Capacidad: </Text>{capacidadText}</Text>
            <Pressable style={styles.button} onPress={() => handleShowMapModal(item.lat, item.lng)}>
              <Text style={styles.textButton}>Ver Ubicación</Text>
            </Pressable>
          </View>
        )}
        {/* Icono en la esquina superior derecha */}
        <View style={styles.iconContainer}>
          <Image source={require('../assets/icons8-down-arrow-50.png')} style={styles.icon} />
        </View>
      </Pressable>
    );
  };

  const filterAlbergues = () => {
    return albergues.filter(albergue =>
      albergue.ciudad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      albergue.edificio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      albergue.coordinador.toLowerCase().includes(searchQuery.toLowerCase()) ||
      albergue.codigo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Albergues</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar por ciudad, edificio, coordinador o código"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {searchQuery.length > 0 && (
        <Text style={styles.searchResultText}>
          Resultados de: {searchQuery}
        </Text>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          {filterAlbergues().length > 0 ? (
            <FlatList
              data={filterAlbergues()}
              renderItem={renderCard}
              keyExtractor={item => item.codigo}
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              ref={flatListRef}
            />
          ) : (
            <Text style={styles.noResultsText}>No se encontraron resultados</Text>
          )}
        </>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fb7405',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  searchResultText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#0a509e',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative', // Para permitir el posicionamiento absoluto del icono
  },
  albergueCodigo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fb7405',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  detailsContainer: {
    marginTop: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff',
  },
  button: {
    backgroundColor: '#023063',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24, // Ancho del icono
    height: 24, // Altura del icono
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Albergues;
