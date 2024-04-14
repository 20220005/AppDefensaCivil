import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginForm = () => {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
          setAlertMessage("Usuario o contraseña incorrectos.");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 15000);
          console.log("Error al iniciar sesión:", responseData);
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  const CustomAlert = ({ message }) => (
    <View style={styles.customAlert}>
      <Text style={styles.customAlertText}>{message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo_defensa_civil_ultimate.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Inicio de Sesión</Text>
      {showAlert && <CustomAlert message={alertMessage} />}
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
      <TouchableOpacity
        onPress={() => navigation.navigate("Recuperar")}
      >
        <Text style={styles.recuperarTexto}>Recuperar Contraseña</Text>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
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
    backgroundColor: "#fb7405",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  recuperarTexto: {
    color: "#0a509e",
    fontSize: 16,
  },
  customAlert: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  customAlertText: {
    color: "white",
    fontSize: 16,
  },
});

export default LoginForm;
