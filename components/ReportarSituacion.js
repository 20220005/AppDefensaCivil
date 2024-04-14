import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';





const ReportForm = () => {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fotoBase64, setFotoBase64] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');


  const clearForm = () => {
    setTitulo('');
    setDescripcion('');
    setFotoBase64('');
    setLatitud('');
    setLongitud('');
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
      base64: true
    });

    if (!result.cancelled) {

      setFotoBase64(result.assets[0].base64);
    }
    else {
      alert('Error', 'Hubo un problema al seleccionar la foto');
    }
  };


  const takeImage = async () => {
    const status = await ImagePicker.requestCameraPermissionsAsync();
    if (status.status !== 'granted') {
      alert('Permisos insuficientes', 'Necesitas dar permisos para acceder a la cámara');
      return;
    }
    else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
        base64: true
      });

      if (!result.cancelled) {
        setFotoBase64(result.assets[0].base64);
      }
      else {
        alert('Error', 'Hubo un problema al tomar la foto');

      }
    }
  }


  const handleSubmit = async () => {

    if (!titulo || !descripcion || !fotoBase64 || !latitud || !longitud) {
      Alert.alert('Campos incompletos', 'Favor de llenar todos los campos.');
      return;
    }


    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('foto', fotoBase64);
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
        alert('Situación reportada con éxito')
        clearForm();

      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Hubo un problema al enviar el formulario');
      });
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reporta tu situación a Defensa Civil</Text>
      </View>
      <View style={styles.container}>

        <Image source={{ uri: `data:image/jpge;base64,${fotoBase64} ` }} style={styles.image} />
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


        <Pressable style={styles.button} onPress={takeImage}>
          <Text style={styles.text}>Tomar Foto</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.text}>Seleccionar Foto</Text>
        </Pressable>

        <Pressable style={styles.buttonReportar} onPress={handleSubmit}>
          <Text style={styles.text}>Reportar</Text>
        </Pressable>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#fb7405',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0a509e",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonReportar: {
    backgroundColor: "#fb7405",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default ReportForm;
