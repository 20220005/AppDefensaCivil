import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { TextInput, View, Text, Pressable, StyleSheet } from "react-native";

const CambiarContraseña = () => {
    const [claveantigua, setClaveAntigua] = useState("");
    const [clavenueva, setClaveNueva] = useState("");
    const [token, setToken] = useState("");
    const [mensaje, setMensaje] = useState("");

    const ObtenerToken = async () =>{
        AsyncStorage.getItem('token').then((e) => {
            setToken(e);
        });
    }

    useEffect(() =>{
        ObtenerToken();
    },[]);

    const handleSubmit = async() =>{
        const antiguaValue = claveantigua.trim();
        const nuevaValue = clavenueva.trim();

        if(!antiguaValue || !nuevaValue){
            alert("Necesita llenar toods los campos");
        }else{
            const url = "https://adamix.net/defensa_civil/def/cambiar_clave.php";
            const data = new FormData();
            data.append("token", token);
            data.append("clave_anterior", antiguaValue);
            data.append("clave_nueva", nuevaValue);

            try {
                const response = await fetch(url,{
                    method:"POST",
                    body:data
                });
                
                const responseData = await response.json();
                if(response.data){
                    setMensaje(responseData.mensaje);
                }else{
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

    return(
        <View style={styles.container}>
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
            {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    message: {
        marginTop: 20,
        color: 'red',
        fontStyle: 'italic',
    },
});

export default CambiarContraseña;
