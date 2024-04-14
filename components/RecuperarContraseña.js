import React, { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet, Image } from "react-native";

const RecuperarContraseña = () => {
    const [cedula, setCedula] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleRecuperar = async () => {
        const cedulaValue = cedula.trim();
        const correoValue = correo.trim();

        if (!cedulaValue || !correoValue) {
            setMensaje("Todos los campos deben estar llenos");
            return;
        }

        const url = "https://adamix.net/defensa_civil/def/recuperar_clave.php";
        const data = new FormData();
        data.append("cedula", cedulaValue);
        data.append("correo", correoValue);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: data,
            });

            const responseData = await response.json();
            setMensaje(responseData.mensaje);
            setCedula("");
            setCorreo("");
            setTimeout(() => {
                setMensaje("");
            }, 3000);
            if (!responseData.exito) {
                setTimeout(() => {
                    setMensaje("");
                }, 3000);
            }
        } catch (error) {
            console.error("Error al recuperar la contraseña: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/logo_defensa_civil_ultimate.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Recuperar Contraseña</Text>
            {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Cédula"
                value={cedula}
                onChangeText={(text) => setCedula(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={correo}
                onChangeText={(text) => setCorreo(text)}
            />
            <Pressable onPress={handleRecuperar} style={styles.button}>
                <Text style={styles.buttonText}>Recuperar Contraseña</Text>
            </Pressable>
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
    message: {
        color: "red",
        textAlign: "center",
        paddingBottom: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default RecuperarContraseña;
