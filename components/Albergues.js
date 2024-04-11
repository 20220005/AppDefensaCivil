import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, Button, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import Loader from './Loader';
import axios from 'axios';

const Albergues = () => {
    const [albergues, setAlbergues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://adamix.net/defensa_civil/def/albergues.php');
                setAlbergues(response.data.datos);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Este efecto se ejecutará cada vez que el componente reciba el foco
    useFocusEffect(
        React.useCallback(() => {
            // Desplaza el FlatList al primer ítem cuando se obtiene el foco
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ animated: true, index: 0 });
            }
            // Limpia el campo de búsqueda al volver al componente
            setSearchQuery('');
        }, [])
    );

    const renderCard = ({ item }) => {
        const capacidadText = item.capacidad ? item.capacidad : ' - ';
      
        return (
          <View style={styles.card}>
            <Text style={styles.albergueCodigo}>{item.codigo}</Text>
            <Text style={styles.cardTitle}>{item.edificio}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Ciudad: </Text>{item.ciudad}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Coordinador: </Text>{item.coordinador}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Télefono: </Text>{item.telefono}</Text>
              <Text style={styles.details}><Text style={{fontWeight: 'bold'}}>Capacidad: </Text>{capacidadText}</Text>
              <Pressable style={styles.button}>
                <Text style={styles.textButton}>Ver Ubicación</Text>
              </Pressable>             
            </View>
          </View>
        );
    };

    // Filtro basado en el término de búsqueda ingresado
    const filterAlbergues = () => {
        return albergues.filter(albergue =>
            albergue.ciudad.toLowerCase().includes(searchQuery.toLowerCase()) ||
            albergue.edificio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            albergue.coordinador.toLowerCase().includes(searchQuery.toLowerCase()) ||
            albergue.codigo.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Albergues</Text>
            <TextInput
                style={styles.input}
                placeholder="Buscar por ciudad, edificio, coordinador o código"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={filterAlbergues()}
                    renderItem={renderCard}
                    keyExtractor={item => item.codigo}
                    contentContainerStyle={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    ref={flatListRef}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fb7405',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
        width: '100%',
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#0a509e',
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    albergueCodigo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fb7405',
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    detailsContainer: {
        marginTop: 10,
    },
    details: {
        fontSize: 18,
        marginBottom: 5,
        color: '#fff',
    },
    buttonUbicacion: {
        backgroundColor: '#023063',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#023063', 
        borderRadius: 10, 
        paddingHorizontal: 20, 
        paddingVertical: 10, // Ajusta el espaciado vertical dentro del botón
        marginVertical: 10,
        borderWidth: 1, 
        borderColor: '#fff', 
    },
    textButton: {
        color: '#fff', 
        textAlign: 'center', 
        fontSize: 16, 
    },

});

export default Albergues;