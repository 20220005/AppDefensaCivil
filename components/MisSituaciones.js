import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, Image, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
import { useFocusEffect } from '@react-navigation/native';

const MisSituacionesComponente = () => {
  const [situaciones, setSituaciones] = useState([]);
  const [situacionSeleccionada, setSituacionSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const obtenerSituaciones = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('token', token);
      
      const response = await fetch('https://adamix.net/defensa_civil/def/situaciones.php', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.exito) {
        setSituaciones(data.datos);
        
      } else {
        console.error('Error al obtener las situaciones:', data.mensaje);
      }
    } catch (error) {
      console.error('Error al obtener las situaciones:', error);
    }
  };

  useFocusEffect(() => {

    obtenerSituaciones();
    
  }, );

  const handleSituacionPress = (situacion) => {
    setSituacionSeleccionada(situacion);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Situaciones Reportadas</Text>
  
     

         {
            situaciones.length === 0 && <Loader />
         }
       
      <FlatList
        data={situaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSituacionPress(item)} style={{height: 200, width: 250}}>

            <Text style={styles.itemTitle}>{item.titulo}</Text>
            <Text style={styles.itemDate}>{item.fecha}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
    
            <Image source={{ uri: `data:image/png;base64,${situacionSeleccionada?.foto} `}} style={styles.modalImage}  />
            <Text style={styles.modalText}>Código del reporte: {situacionSeleccionada?.id}</Text>
            <Text style={styles.modalText}>Fecha del reportado: {situacionSeleccionada?.fecha}</Text>
            <Text style={styles.modalText}> {situacionSeleccionada?.titulo}</Text>
            <Text style={styles.modalText}>Descripción del evento: {situacionSeleccionada?.descripcion}</Text>
            <Text style={styles.modalText}>Estado actual del reporte: {situacionSeleccionada?.estado}</Text>
         
           <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>

            <Text style={styles.buttonText}>Cerrar</Text>

          </TouchableOpacity>

            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  button:{
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText:{
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  
  }
});

export default MisSituacionesComponente;
