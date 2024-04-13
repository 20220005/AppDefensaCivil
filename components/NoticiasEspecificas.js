import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const NoticiasEspecificas = () => {
  const route = useRoute();
  const { userName, userToken } = route.params;
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const formData = new FormData();
    formData.append('token', userToken);

    fetch('https://adamix.net/defensa_civil/def/noticias_especificas.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.exito) {
        setNoticias(data.datos);
      } else {
        console.error('Error al obtener las noticias:', data.mensaje);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [userToken]);

  const renderNoticia = ({ item }) => (
    <View style={styles.noticiaContainer}>
      <Text style={styles.fecha}>{item.fecha}</Text>
      <Text style={styles.titulo}>{item.titulo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.usuario}>Nombre del usuario: {userName}</Text>
      <Text style={styles.token}>Token: {userToken}</Text> */}
      <FlatList
        data={noticias}
        renderItem={renderNoticia}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a509e',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  noticiaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
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
  },
});

export default NoticiasEspecificas;
