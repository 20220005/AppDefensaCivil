import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterForm = () => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    const cedulaValue = cedula.trim();
    const nombreValue = nombre.trim();
    const apellidoValue = apellido.trim();
    const claveValue = clave.trim();
    const correoValue = correo.trim();
    const telefonoValue = telefono.trim();

    if (!cedulaValue || !nombreValue || !apellidoValue || !claveValue || !correoValue || !telefonoValue) {
      alert('Todos los campos son requeridos.');
    } else {
      const url = 'https://adamix.net/defensa_civil/def/registro.php';
      const data = new FormData();
      data.append('cedula', cedulaValue);
      data.append('nombre', nombreValue);
      data.append('apellido', apellidoValue);
      data.append('clave', claveValue);
      data.append('correo', correoValue);
      data.append('telefono', telefonoValue);

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: data
        });
        const responseData = await response.json();

        if (responseData.exito) {
          alert('Registro exitoso');
          console.log('Respuesta del servidor:', responseData);
        } else {
          alert('Error al registrar');
          console.log('Error al registrar:', responseData);
          setErrorMessage(responseData.mensaje);
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        setErrorMessage('Error al registrar, por favor intente nuevamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Clave"
        value={clave}
        onChangeText={setClave}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterForm;
