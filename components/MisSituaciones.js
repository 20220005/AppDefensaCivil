import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, Image, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

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
          <TouchableOpacity onPress={() => handleSituacionPress(item)} style={styles.card}>

            <Text style={styles.itemId}>#{item.id}</Text>
            <Text style={styles.itemTitle}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
        style={{ width: '100%' }}
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
            <View style={styles.topid}>
            <Text style={{...styles.modalText,color:'#fb7405'}}># {situacionSeleccionada?.id}</Text>
            <Text style={{...styles.modalText,color:'#fb7405'}}>{situacionSeleccionada?.fecha}</Text>
            </View>
            <ScrollView style={{ maxHeight:100 }}>
            <Text style={{...styles.modalText,fontSize:25}}> {situacionSeleccionada?.titulo}</Text>
            </ScrollView>
            <Text style={styles.modalText}> {situacionSeleccionada?.descripcion}</Text>
            <Text style={styles.modalText}>Estado: {situacionSeleccionada?.estado}</Text>
         
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fb7405',
  },
  card: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#0a509e',
    borderRadius: 10,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  itemId: {
    fontSize: 16,
    color: '#fb7405',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContent: {
    backgroundColor: '#0a509e',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#fb7405',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  topid:{
    flexDirection:'row',
    justifyContent:'space-between',
  }
});


export default MisSituacionesComponente;
