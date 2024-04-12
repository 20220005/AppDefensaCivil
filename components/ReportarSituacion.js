import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable,Text, Alert, StyleSheet } from 'react-native';

const ReportForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');



  const handleSubmit = async () => {


    if (!titulo || !descripcion || !fotoUrl || !latitud || !longitud) {
        alert('Campos incompletos favor de llenar todos los campos.');
        return;
      }

    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('foto', fotoUrl);
    formData.append('latitud', latitud);
    formData.append('longitud', longitud);
    formData.append('token', token);
    


    fetch('https://adamix.net/defensa_civil/def/nueva_situacion.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Hubo un problema al enviar el formulario');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titulo"
        value={titulo}
        onChangeText={setTitulo}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Descripcion"
        value={descripcion}
        onChangeText={setDescripcion}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la foto"
        value={fotoUrl}
        onChangeText={setFotoUrl}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Latitud"
        value={latitud}
        onChangeText={setLatitud}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Longitud"
        value={longitud}
        onChangeText={setLongitud}
        required
      />

    <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Reportar</Text>
    </Pressable>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#0a509e",
    borderRadius: 5,
  },
  text:{
    color: "white",
    fontWeight: "bold",
  }
});

export default ReportForm;