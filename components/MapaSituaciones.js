import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, {  useState } from "react";
import { View, StyleSheet, Dimensions,Text, TouchableOpacity } from "react-native";
import MapView, {Marker} from "react-native-maps";


const MapaSituacion = () => {
    const [situacion, setSituacion] = useState([]);
    const [selectSituacion, setSelectSituacion] = useState(null);
    useFocusEffect(() =>{
        const url = "https://adamix.net/defensa_civil/def/situaciones.php";
        const fetchData = async () =>{
            const getToken = await AsyncStorage.getItem("token");
            try {
                const data = new FormData();
                data.append("token", getToken);
                const response = await fetch(url,
                {
                    method: "POST",
                    body: data
                })
                const responseData = await response.json();

              
                if(responseData.exito){
                    setSituacion(responseData.datos);
                    
                }else{
                    console.error(responseData.mensaje);
                }
            } catch (error) {
                console.error("Ha ocurrido un error obteniendo las situaciones: ",error);
            }
        }
        fetchData();
    },);

    return(
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 18.479,
                    longitude: -69.891,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                showsMyLocationButton={true}
            >
                {situacion.map((situacion, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: parseFloat(situacion.latitud),
                            longitude: parseFloat(situacion.longitud),
                        }}
                        title={situacion.titulo}
                        description={situacion.descripcion}
                        pinColor="red"
                    />
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 3,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
});

export default MapaSituacion;