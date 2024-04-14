import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Pressable, Image, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoticiasEspecificas = ({ route }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [noticias, setNoticias] = useState([]);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const obtenerNoticiasEspecificas = async () => {
    try {
      const getName = await AsyncStorage.getItem('nombre');
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('token', token);
      setUserName(getName);

      const response = await fetch('https://adamix.net/defensa_civil/def/noticias_especificas.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.exito) {
        setNoticias(data.datos);

      } else {
        console.error('Error al obtener las noticias especificas:', data.mensaje);
      }
    } catch (error) {
      console.error('Error al obtener las noticias especificas:', error);
    }
  };

  useFocusEffect(() => {
    obtenerNoticiasEspecificas();
  },);

  const obtenerPrimeras20Palabras = (contenido) => {
    // Dividir el contenido en palabras
    const palabras = contenido.split(' ');
    // Tomar las primeras 40 palabras y unirlas nuevamente en una cadena
    let primeras40Palabras = palabras.slice(0, 20).join(' ');
    // Si el contenido tiene más de 40 palabras, agregar puntos suspensivos y "Leer más"
    if (palabras.length > 20) {
      primeras40Palabras += '... Leer más';
    }
    return primeras40Palabras;
  };

  const handleNoticiaPress = (noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderNoticia = ({ item }) => (
    <Pressable
      style={styles.noticiaContainer}
      onPress={() => handleNoticiaPress(item)}
    >
      <Image source={{ uri: item.foto }} style={styles.imagen} />
      <View style={styles.textContainer}>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.contenido}>{obtenerPrimeras20Palabras(item.contenido)}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenido, {userName}!</Text>
        <Text style={styles.appMessage}>Gracias por usar nuestra aplicación de Defensa Civil.</Text>
      </View>
      <View style={styles.noticiasHeader}>
        <Text style={styles.noticiasTitle}>Noticias</Text>
      </View>
      <FlatList
        data={noticias}
        renderItem={renderNoticia}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />

      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeModal}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {noticiaSeleccionada && (
              <>
                <Text style={styles.modalTitulo}>{noticiaSeleccionada.titulo}</Text>
                <Image source={{ uri: noticiaSeleccionada.foto }} style={styles.modalImagen} />
                <Text style={styles.modalFecha}>{noticiaSeleccionada.fecha}</Text>
                <Text style={styles.modalContenido}>{noticiaSeleccionada.contenido}</Text>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>


    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0a509e',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  appMessage: {
    fontSize: 16,
    color: '#fff',
  },
  noticiasHeader: {
    backgroundColor: '#fb7405',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  noticiasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  flatListContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  noticiaContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  fecha: {
    fontSize: 18,
    color: '#fb7405',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100, // Ajusta el espacio para el botón de cerrar
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    backgroundColor: '#023063',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  modalImagen: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalFecha: {
    fontSize: 18,
    color: '#fb7405',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContenido: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default NoticiasEspecificas;
