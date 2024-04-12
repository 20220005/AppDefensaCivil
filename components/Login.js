import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginForm = () => {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const cedulaValue = cedula.trim();
    const passwordValue = password.trim();

    if (!cedulaValue || !passwordValue) {
      alert("Todos los campos son requeridos.");
    } else {
      const url = "https://adamix.net/defensa_civil/def/iniciar_sesion.php";
      const data = new FormData();
      data.append("cedula", cedulaValue);
      data.append("clave", passwordValue);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: data,
        });
        const responseData = await response.json();

        if (responseData.exito) {
          await AsyncStorage.setItem("token", responseData.datos.token);
          await AsyncStorage.setItem("nombre", responseData.datos.nombre);
          await AsyncStorage.setItem("apellido", responseData.datos.apellido);
          await AsyncStorage.setItem("telefono", responseData.datos.telefono);
          await AsyncStorage.setItem("correo", responseData.datos.correo);

          // Para obtener los datos guardados en AsyncStorage:
          // const token = await AsyncStorage.getItem("token");
          // const nombre = await AsyncStorage.getItem("nombre");
          // const apellido = await AsyncStorage.getItem("apellido");
          // const telefono = await AsyncStorage.getItem("telefono")
          // const correo = await AsyncStorage.getItem("correo");


          navigation.navigate("Noticias Especificas", {
            userName: responseData.datos.nombre,
            userToken: responseData.datos.token,
          });

         
          setCedula("");
          setPassword("");
        } else {
          alert("Usuario o contraseña incorrectos.");
          console.log("Error al iniciar sesión:", responseData);
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginForm;
