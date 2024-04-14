import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {

  const acciones = [
    { 
      title: 'Evacuación en caso de emergencia', 
      description: 'Se establecen procedimientos y rutas de evacuación para desastres naturales. Los ciudadanos son instruidos sobre cómo actuar y a dónde dirigirse en caso de emergencia.' 
    },
    { 
      title: 'Primeros auxilios', 
      description: 'Los ciudadanos aprenden conocimientos básicos de primeros auxilios para brindar ayuda en situaciones de emergencia. Esto incluye reanimación cardiopulmonar (RCP), control de hemorragias y manejo de heridas.' 
    },
    { 
      title: 'Prevención de incendios', 
      description: 'Se promueven medidas para prevenir incendios en hogares, edificios y áreas públicas. Además, se enseña a la población cómo actuar en caso de incendio, incluyendo el uso adecuado de extintores y planes de evacuación.' 
    },
    { 
      title: 'Búsqueda y rescate', 
      description: 'Equipos especializados son entrenados en técnicas de búsqueda y rescate para ayudar a personas atrapadas en situaciones de desastre. Esto incluye el uso de perros de búsqueda, equipos de rescate y técnicas de extracción.' 
    },
    { 
      title: 'Alerta temprana', 
      description: 'Se implementan sistemas de alerta temprana para advertir a la población sobre posibles desastres naturales, como huracanes, terremotos e inundaciones. Los ciudadanos son educados sobre cómo responder de manera adecuada a estas alertas.' 
    },
    // Puedes añadir más acciones importantes aquí
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Acciones Importantes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.scrollView}
      >
        {acciones.map((item, index) => (
          <View style={styles.slide} key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
  },
  scrollView: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
  },
  slide: {
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default HomeScreen;
