import React, {useState} from "react";
import { Text , View, TextInput, Pressable, StyleSheet} from "react-native";

const RecuperarContraseña = () =>{
    const [cedula , setCedula] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleRecuperar =  async () => {
        const cedulaValue = cedula.trim();
        const correoValue = correo.trim();

        if(!cedulaValue || !correoValue){
            alert("Todos los campos deben estar llenos");
        } else{
            const url = "https://adamix.net/defensa_civil/def/recuperar_clave.php";
            const data = new FormData();
            data.append("cedula", cedulaValue);
            data.append("correo", correoValue);

            try {
                const response = await fetch(url,
                {
                    method: "POST",
                    body: data
                });

                const responseData = await response.json();
                if(responseData.exito){
                    setMensaje(responseData.mensaje);
                }else{
                    setMensaje(responseData.mensaje);
                    setTimeout(() => {
                       setMensaje("") 
                    }, 3000);
                }
            } catch (error) {
                console.error("Error al recuperar la contraseña: ",error)
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Cedula"
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
            {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
    }
});

export default RecuperarContraseña;
