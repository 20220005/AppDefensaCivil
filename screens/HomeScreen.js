import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {

  const acciones = [
    {
      title: 'Evacuación en caso de emergencia',
      description: 'Se establecen procedimientos y rutas de evacuación para desastres naturales. Los ciudadanos son instruidos sobre cómo actuar y a dónde dirigirse en caso de emergencia.',
      icon: require('../assets/icons8-evacuation-50.png')
    },
    {
      title: 'Primeros auxilios',
      description: 'Los ciudadanos aprenden conocimientos básicos de primeros auxilios para brindar ayuda en situaciones de emergencia. Esto incluye reanimación cardiopulmonar (RCP), control de hemorragias y manejo de heridas.',
      icon: require('../assets/icons8-first-aid-48.png')
    },
    {
      title: 'Prevención de incendios',
      description: 'Se promueven medidas para prevenir incendios en hogares, edificios y áreas públicas. Además, se enseña a la población cómo actuar en caso de incendio, incluyendo el uso adecuado de extintores y planes de evacuación.',
      icon: require('../assets/icons8-fire-48.png')
    },
    {
      title: 'Búsqueda y rescate',
      description: 'Equipos especializados son entrenados en técnicas de búsqueda y rescate para ayudar a personas atrapadas en situaciones de desastre. Esto incluye el uso de perros de búsqueda, equipos de rescate y técnicas de extracción.',
      icon: require('../assets/icons8-rescue-32.png')
    },
    {
      title: 'Alerta temprana',
      description: 'Se implementan sistemas de alerta temprana para advertir a la población sobre posibles desastres naturales, como huracanes, terremotos e inundaciones. Los ciudadanos son educados sobre cómo responder de manera adecuada a estas alertas.',
      icon: require('../assets/icons8-alert-50.png')
    },
  ];

  const ContactCard = () => {
    return (
      <View style={styles.contactCard}>
        <View style={styles.contactCardHeader}>
          <Text style={styles.contactCardHeaderText}>¿Dónde estamos ubicados?</Text>
        </View>
        <View style={styles.contactCardBody}>
          <Text style={styles.contactCardText}>
            <Text style={styles.contactCardLabel}>Dirección: </Text>
            Avenida Ortega y Gasset Esq. Pepillo Salcedo, Plaza de la Salud, Edif. Comisión Nacional de Emergencias, 2do nivel. Ens. La Fe D.N., R.D.
          </Text>
          <Text style={styles.contactCardText}>
            <Text style={styles.contactCardLabel}>Teléfono: </Text>
            809-472-8614
          </Text>
          <Text style={styles.contactCardText}>
            <Text style={styles.contactCardLabel}>Fax: </Text>
            809-472-8614
          </Text>
          <Text style={styles.contactCardText}>
            <Text style={styles.contactCardLabel}>Horario: </Text>
            De Lunes a Viernes de 8:00 AM - 4:00 PM
          </Text>
          <Text style={styles.contactCardText}>
            <Text style={styles.contactCardLabel}>Correo electrónico: </Text>
            info@defensacivil.gob.do
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={require("../assets/logo_defensa_civil_banner.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>Acciones Importantes de la Defensa Civil</Text>
          <Text style={styles.subHeaderText}>Sentimos pasión por lo que hacemos</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.scrollView}
        >
          {acciones.map((item, index) => (
            <View style={styles.slide} key={index}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
        <ContactCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fb7405',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#fff',
  },
  scrollView: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  slide: {
    width: Dimensions.get('window').width - 40,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a509e',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  logo: {
    width: Dimensions.get('window').width - 40, // Ajusta el tamaño de la imagen
    height: 100, // Ajusta la altura de la imagen según lo necesites
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginTop: 30,
  },
  contactCard: {
    backgroundColor: '#fb7405',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    width: Dimensions.get('window').width - 40,
  },
  contactCardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 10,
    marginBottom: 10,
  },
  contactCardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactCardBody: {},
  contactCardText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  contactCardLabel: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
