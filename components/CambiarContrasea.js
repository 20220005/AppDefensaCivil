import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { TextInput, View, Text, Pressable, StyleSheet, Image } from "react-native";

const CambiarContraseña = () => {
    const [claveantigua, setClaveAntigua] = useState("");
    const [clavenueva, setClaveNueva] = useState("");
    const [token, setToken] = useState("");
    const [mensaje, setMensaje] = useState("");

    const ObtenerToken = async () => {
        AsyncStorage.getItem('token').then((e) => {
            setToken(e);
        });
    }

    useEffect(() => {
        ObtenerToken();
    }, []);

    const handleSubmit = async () => {
        const antiguaValue = claveantigua.trim();
        const nuevaValue = clavenueva.trim();

        if (!antiguaValue || !nuevaValue) {
            alert("Necesita llenar toods los campos");
        } else {
            const url = "https://adamix.net/defensa_civil/def/cambiar_clave.php";
            const data = new FormData();
            data.append("token", token);
            data.append("clave_anterior", antiguaValue);
            data.append("clave_nueva", nuevaValue);

            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: data
                });

                const responseData = await response.json();
                if (response.data) {
                    setMensaje(responseData.mensaje);
                } else {
                    setMensaje(responseData.mensaje);
                    setTimeout(() => {
                        setMensaje("");
                    }, 3000);
                }
            } catch (error) {
                console.error("Error al cambiar la contraseña: ", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/logo_defensa_civil_ultimate.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Cambio de Contraseña</Text>
            {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Antigua Contraseña"
                value={claveantigua}
                onChangeText={(text) => setClaveAntigua(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nueva Contraseña"
                value={clavenueva}
                onChangeText={(text) => setClaveNueva(text)}
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Recuperar Contraseña</Text>
            </Pressable>
        </View>
    )
}

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
    message: {
        marginTop: 10,
        marginBottom: 10,
        color: 'red',
        fontStyle: 'italic',
        textAlign: "center",
        fontWeight: 'bold',
    },
});

export default CambiarContraseña;
