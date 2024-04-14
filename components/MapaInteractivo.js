import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapaInteractivo = () => {
  const [albergues, setAlbergues] = useState([]);
  const [selectedAlbergue, setSelectedAlbergue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adamix.net/defensa_civil/def/albergues.php');
        console.log(response.data.datos); 
        setAlbergues(response.data.datos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);


  const moveToMarker = (marker) =>{
    const region ={
        latitude: parseFloat(marker.lng),
        longitude: parseFloat(marker.lat),
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
    };
    setSelectedAlbergue(region);
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 18.479,
          longitude: -69.891,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsMyLocationButton={true}
      >
        {albergues.map((albergue, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(albergue.lng),
              longitude: parseFloat(albergue.lat),
            }}
            title={albergue.edificio}
            description={`Coordinador: ${albergue.coordinador}`}
            pinColor="red"
          />
        ))}
      </MapView>
      <ScrollView style={styles.albergueList}>
        {albergues.map((albergue, index) => (
          <TouchableOpacity key={index} onPress={() => moveToMarker(albergue)}>
            <View style={styles.albergueItem}>
              <Text style={styles.albergueText}>{albergue.edificio}</Text>
              <Text style={styles.albergueText}>{albergue.ciudad}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  albergueList: {
    flex: 1,
    backgroundColor: '#fb7405',
    padding: 10,
  },
  albergueItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albergueText: {
    color: '#fff',
  },
});

export default MapaInteractivo;